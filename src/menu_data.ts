export interface MenuItem {
  id: string;
  name: string;
  category: "Breakfast" | "Lunch" | "Snacks" | "Dinner" | "Desserts" | "Beverages";
  price: number;
  isVeg: boolean;
  isBestSeller: boolean;
  nutrition: string;
  allergens: string;
  description: string;
  image: string;
}

const initialMenuRaw: MenuItem[] = [
  // ==========================================
  // MORNING MENU (BREAKFAST) - South Indian
  // ==========================================
  {
    id: "b-si-1",
    name: "Idli (2 pcs)",
    category: "Breakfast",
    price: 40,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 120, Protein: 4g, Carbs: 24g",
    allergens: "None",
    description: "Traditional steamed cakes made of rice and fermented black lentils.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-si-2",
    name: "Mini Idli",
    category: "Breakfast",
    price: 55,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 150, Protein: 5g, Carbs: 28g",
    allergens: "Ghee",
    description: "Bite-sized baby idlis tossed gently in warm ghee and spices.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-si-3",
    name: "Ghee Idli",
    category: "Breakfast",
    price: 60,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 180, Protein: 4g, Fat: 8g",
    allergens: "Dairy (Ghee)",
    description: "Fluffy steamed idlis generously smeared with aromatic pure cow ghee.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-si-4",
    name: "Sambar Idli",
    category: "Breakfast",
    price: 65,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 210, Protein: 7g, Carbs: 35g",
    allergens: "None",
    description: "Steamed idlis completely immersed in piping hot traditional lentil sambar.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-si-5",
    name: "Rava Idli",
    category: "Breakfast",
    price: 55,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 140, Protein: 5g, Carbs: 26g",
    allergens: "Wheat (Rava), Dairy (Curd)",
    description: "Semolina and yogurt steamed cakes flavored with mustard seeds and curry leaves.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-si-6",
    name: "Plain Dosa",
    category: "Breakfast",
    price: 50,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 165, Protein: 3g, Carbs: 29g",
    allergens: "None",
    description: "Golden crispy thin crepe made of fermented rice and lentil batter.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-si-7",
    name: "Masala Dosa",
    category: "Breakfast",
    price: 80,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 290, Protein: 6g, Carbs: 45g",
    allergens: "None",
    description: "Crispy dosa folded over a flavorful spiced mashed potato filling.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-si-8",
    name: "Ghee Roast",
    category: "Breakfast",
    price: 90,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 250, Protein: 4g, Fat: 14g",
    allergens: "Dairy (Ghee)",
    description: "Extra thin, paper-crispy dosa roasted beautifully using pure ghee.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-si-9",
    name: "Paper Roast",
    category: "Breakfast",
    price: 95,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 210, Protein: 4g, Carbs: 34g",
    allergens: "None",
    description: "Ultra-thin and long, extremely crispy rice batter crepe.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-si-10",
    name: "Onion Dosa",
    category: "Breakfast",
    price: 80,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 220, Protein: 5g, Carbs: 38g",
    allergens: "None",
    description: "Crispy rice crepe sprinkled with finely chopped fresh onions and green chilies.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-si-11",
    name: "Onion Uttapam",
    category: "Breakfast",
    price: 85,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 260, Protein: 6g, Carbs: 42g",
    allergens: "None",
    description: "Thick savory pancake topped with sweet caramelized onions and fresh cilantro.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-si-12",
    name: "Vegetable Uttapam",
    category: "Breakfast",
    price: 90,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 270, Protein: 7g, Carbs: 45g",
    allergens: "None",
    description: "Thick rice batter pancake loaded with colorful finely chopped seasonal vegetables.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-si-13",
    name: "Set Dosa",
    category: "Breakfast",
    price: 75,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 240, Protein: 6g, Carbs: 40g",
    allergens: "None",
    description: "Set of three soft, spongy, thick mini dosas served with kurma.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-si-14",
    name: "Podi Dosa",
    category: "Breakfast",
    price: 90,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 280, Protein: 6g, Fat: 10g",
    allergens: "Dairy (Ghee)",
    description: "Crispy crepe coated with spicy gunpowder (milagai podi) and ghee.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-si-15",
    name: "Mysore Masala Dosa",
    category: "Breakfast",
    price: 100,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 320, Protein: 7g, Carbs: 48g",
    allergens: "Dairy (Butter)",
    description: "Crispy crepe with inside spicy red garlic-chili chutney rub and potato stuffing.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-si-16",
    name: "Pongal",
    category: "Breakfast",
    price: 70,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 280, Protein: 8g, Carbs: 46g",
    allergens: "Cashew",
    description: "Comforting rice and lentil porridge seasoned with black pepper, cumin, and cashews.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-si-17",
    name: "Ven Pongal",
    category: "Breakfast",
    price: 75,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 310, Protein: 8g, Fat: 9g",
    allergens: "Dairy (Ghee), Cashew",
    description: "Classic South Indian breakfast of rice cooked with yellow split moong dal and ghee.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-si-18",
    name: "Upma",
    category: "Breakfast",
    price: 60,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 190, Protein: 4g, Carbs: 32g",
    allergens: "Wheat (Rava)",
    description: "Savory semolina porridge cooked with onions, green chilies, and curry leaves.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-si-19",
    name: "Rava Upma",
    category: "Breakfast",
    price: 65,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 200, Protein: 4g, Carbs: 34g",
    allergens: "Wheat (Semolina)",
    description: "Tasty breakfast dish made from dry roasted semolina, fresh vegetables, and tempering.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-si-20",
    name: "Poori Masala",
    category: "Breakfast",
    price: 80,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 340, Protein: 7g, Fat: 14g",
    allergens: "Wheat",
    description: "Deep-fried puffy whole wheat bread served with dry spiced potato curry.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-si-21",
    name: "Appam",
    category: "Breakfast",
    price: 70,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 130, Protein: 2g, Carbs: 23g",
    allergens: "None",
    description: "Bowl-shaped thin fermented rice pancakes with a soft, thick coconut milk center.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-si-22",
    name: "Idiyappam",
    category: "Breakfast",
    price: 75,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 150, Protein: 3g, Carbs: 30g",
    allergens: "None",
    description: "Steam-cooked string hoppers made of rice flour, served with coconut milk.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-si-23",
    name: "Puttu",
    category: "Breakfast",
    price: 80,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 220, Protein: 5g, Carbs: 44g",
    allergens: "None",
    description: "Steamed cylinders of ground rice and grated coconut layered beautifully.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-si-24",
    name: "Vada (2 pcs)",
    category: "Breakfast",
    price: 35,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 190, Protein: 6g, Fat: 11g",
    allergens: "None",
    description: "Crispy fried doughnut-shaped fritters made from high protein black lentil batter.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-si-25",
    name: "Medu Vada",
    category: "Breakfast",
    price: 40,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 200, Protein: 6g, Fat: 12g",
    allergens: "None",
    description: "Crisp outside, soft inside spiced black-lentil fritter served with sambar & chutney.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-si-26",
    name: "Kesari",
    category: "Breakfast",
    price: 50,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 220, Protein: 3g, Carbs: 38g",
    allergens: "Wheat (Rava), Dairy, Cashews",
    description: "Sweet golden semolina pudding with sugar, clarified butter, and nuts.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
  },

  // ==========================================
  // MORNING MENU (BREAKFAST) - North Indian
  // ==========================================
  {
    id: "b-ni-1",
    name: "Aloo Paratha",
    category: "Breakfast",
    price: 90,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 290, Protein: 6g, Fat: 8g",
    allergens: "Wheat, Dairy (Butter)",
    description: "Spiced mashed potato stuffed inside griddled whole wheat flatbread, served with curd.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-ni-2",
    name: "Gobi Paratha",
    category: "Breakfast",
    price: 95,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 270, Protein: 6g, Carbs: 42g",
    allergens: "Wheat, Dairy",
    description: "Griddled whole wheat flatbread loaded with flavored grated cauliflower stuffing.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-ni-3",
    name: "Paneer Paratha",
    category: "Breakfast",
    price: 110,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 340, Protein: 12g, Fat: 12g",
    allergens: "Wheat, Dairy (Paneer, Butter)",
    description: "Rich wheat flatbread stuffed with grated cottage cheese and freshly ground green spices.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-ni-4",
    name: "Mooli Paratha",
    category: "Breakfast",
    price: 90,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 260, Protein: 5g, Carbs: 41g",
    allergens: "Wheat",
    description: "Indian flatbread stuffed with spiced, pungent grated white radish.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-ni-5",
    name: "Mix Veg Paratha",
    category: "Breakfast",
    price: 100,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 280, Protein: 6g, Carbs: 43g",
    allergens: "Wheat, Dairy",
    description: "Flatbread cooked on flat-top griddle with a wholesome mixture of minced seasonal vegetables.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-ni-6",
    name: "Chole Bhature",
    category: "Breakfast",
    price: 130,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 450, Protein: 14g, Fat: 18g",
    allergens: "Wheat (Gluten), Dairy",
    description: "Spiced tangy chickpea curry served with large, puffy, golden deep-fried sourdough leavened breads.",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-ni-7",
    name: "Puri Bhaji",
    category: "Breakfast",
    price: 90,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 320, Protein: 6g, Carbs: 46g",
    allergens: "Wheat",
    description: "Golden puffed wheat puri served with mildly spiced North Indian potato gravy curry.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-ni-8",
    name: "Stuffed Kulcha",
    category: "Breakfast",
    price: 120,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 310, Protein: 10g, Carbs: 48g",
    allergens: "Wheat, Dairy",
    description: "Soft refined-flour leavened flatbread stuffed with crumbly paneer and fresh potatoes.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-ni-9",
    name: "Bread Omelette (Egg)",
    category: "Breakfast",
    price: 80,
    isVeg: false,
    isBestSeller: true,
    nutrition: "Cal: 260, Protein: 12g, Fat: 12g",
    allergens: "Egg, Wheat",
    description: "Crispy toast wrapped inside double egg fluffy omelette spiced with green chili & onion.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-ni-10",
    name: "Bread Butter",
    category: "Breakfast",
    price: 50,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 180, Protein: 4g, Fat: 8g",
    allergens: "Wheat, Dairy (Butter)",
    description: "Sliced toasted white bread served with premium salted butter spread.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-ni-11",
    name: "Sandwich Veg",
    category: "Breakfast",
    price: 90,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 210, Protein: 5g, Carbs: 34g",
    allergens: "Wheat",
    description: "Fresh sandwich stuffed with crunchy cucumber, tomato slices, beetroot, and mint chutney.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-ni-12",
    name: "Cheese Sandwich",
    category: "Breakfast",
    price: 110,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 320, Protein: 10g, Fat: 14g",
    allergens: "Wheat, Dairy (Cheese)",
    description: "Toasted golden crust bread with a melting warm mozzarella and cheddar filling.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-ni-13",
    name: "Poha",
    category: "Breakfast",
    price: 70,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 180, Protein: 4g, Carbs: 30g",
    allergens: "Peanut",
    description: "Light and airy flattened rice seasoned with turmeric, mustard seeds, and crunchy roasted peanuts.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-ni-14",
    name: "Sabudana Khichdi",
    category: "Breakfast",
    price: 80,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 220, Protein: 3g, Carbs: 48g",
    allergens: "Peanut",
    description: "Sago pearls cooked with roasted crushed peanuts, soft boiled potatoes, and light ghee tempering.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-ni-15",
    name: "Dahi Paratha",
    category: "Breakfast",
    price: 100,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 280, Protein: 7g, Carbs: 44g",
    allergens: "Wheat, Dairy",
    description: "Crispy tandoor style paratha served alongside rich organic chilled yogurt dip.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },

  // ==========================================
  //🍛 AFTERNOON MENU (LUNCH) - South Indian Meals
  // ==========================================
  {
    id: "l-si-1",
    name: "Mini Meals",
    category: "Lunch",
    price: 140,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 410, Protein: 10g, Carbs: 72g",
    allergens: "None",
    description: "Balanced lunch of Steamed Rice, aromatic Sambar, tangy Rasam, and one Poriyal side dish.",
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-si-2",
    name: "South Indian Meals",
    category: "Lunch",
    price: 180,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 620, Protein: 15g, Carbs: 95g",
    allergens: "None",
    description: "Traditional feast of Rice, Sambar, Rasam, Kootu curry, dry Poriyal, Appalam crisp, and buttermilk.",
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-si-3",
    name: "Special Meals",
    category: "Lunch",
    price: 250,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 820, Protein: 18g, Carbs: 115g",
    allergens: "Dairy",
    description: "Premium thali with starter, South Indian meals, traditional dessert sweet, and creamy payasam.",
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-si-4",
    name: "Lemon Rice",
    category: "Lunch",
    price: 100,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 290, Protein: 5g, Carbs: 52g",
    allergens: "Peanut",
    description: "Fragrant rice flavored with fresh squeezed lemon juice, toasted peanuts, and green chilies.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-si-5",
    name: "Tamarind Rice",
    category: "Lunch",
    price: 100,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 310, Protein: 4g, Carbs: 58g",
    allergens: "Peanut",
    description: "Piquant traditional Puliyodharai cooked with spicy, sour tamarind paste paste.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-si-6",
    name: "Coconut Rice",
    category: "Lunch",
    price: 110,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 340, Protein: 5g, Carbs: 48g",
    allergens: "None",
    description: "Fragrant basmati rice gently cooked with roasted shredded fresh coconut flakes.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-si-7",
    name: "Tomato Rice",
    category: "Lunch",
    price: 110,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 280, Protein: 5g, Carbs: 51g",
    allergens: "None",
    description: "Rice stir-fried with tangy tomatoes, onions, aromatic spices, and warm red chilies.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-si-8",
    name: "Curd Rice",
    category: "Lunch",
    price: 90,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 190, Protein: 5g, Carbs: 32g",
    allergens: "Dairy (Curd, Milk)",
    description: "Probiotic soft mashed rice mixed with cool yogurt, tempered with curry leaves & mustard.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-si-9",
    name: "Bisibele Bath",
    category: "Lunch",
    price: 130,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 320, Protein: 9g, Carbs: 55g",
    allergens: "Dairy (Ghee)",
    description: "Famous Karnataka hot-lentil rice porridge cooked with mixed vegetables, tamarind, and ghee.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-si-10",
    name: "Vegetable Biryani",
    category: "Lunch",
    price: 180,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 380, Protein: 8g, Carbs: 64g",
    allergens: "None",
    description: "Perfectly layers of long grain basmati rice, slow cooked with garden-fresh vegetables.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-si-11",
    name: "Mushroom Biryani",
    category: "Lunch",
    price: 220,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 390, Protein: 9g, Carbs: 62g",
    allergens: "None",
    description: "Biryani style cooked rice layered with juicy fresh marinated button mushrooms.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-si-12",
    name: "Paneer Biryani",
    category: "Lunch",
    price: 240,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 460, Protein: 14g, Carbs: 65g",
    allergens: "Dairy (Paneer)",
    description: "Marinated cubes of rich cottage cheese slow cooked with mint, saffron rice, and spices.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-si-13",
    name: "Veg Fried Rice",
    category: "Lunch",
    price: 170,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 350, Protein: 6g, Carbs: 58g",
    allergens: "Soy",
    description: "Stir-fried wok rice with crisp spring onions, green beans, carrots, and light soy sauce.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-si-14",
    name: "Gobi Fried Rice",
    category: "Lunch",
    price: 190,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 370, Protein: 7g, Carbs: 60g",
    allergens: "Soy",
    description: "Rice fried with shredded crunchy cauliflower bits and light oriental spices.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-si-15",
    name: "Paneer Fried Rice",
    category: "Lunch",
    price: 220,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 430, Protein: 12g, Carbs: 62g",
    allergens: "Dairy, Soy",
    description: "Indo-Chinese style rice stir-fried with diced cottage cheese cubes.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-si-16",
    name: "Mushroom Fried Rice",
    category: "Lunch",
    price: 220,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 380, Protein: 9g, Carbs: 59g",
    allergens: "Soy",
    description: "Wok-tossed rice flavored with wild fresh button mushrooms and cracked pepper.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-si-17",
    name: "Veg Noodles",
    category: "Lunch",
    price: 170,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 340, Protein: 6g, Carbs: 55g",
    allergens: "Wheat (Noodles), Soy",
    description: "Delicious stir-fried noodles loaded with julienne mixed vegetables.",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-si-18",
    name: "Gobi Noodles",
    category: "Lunch",
    price: 190,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 360, Protein: 7g, Carbs: 58g",
    allergens: "Wheat, Soy",
    description: "Stir-fried noodles combined with crispy shredded cauliflower Florets.",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-si-19",
    name: "Paneer Noodles",
    category: "Lunch",
    price: 220,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 420, Protein: 11g, Carbs: 61g",
    allergens: "Wheat, Dairy, Soy",
    description: "Flavorful street-style noodles tossed with succulent chunks of paneer.",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60"
  },

  // ==========================================
  //🍛 AFTERNOON MENU (LUNCH) - North Indian Lunch
  // ==========================================
  {
    id: "l-ni-1",
    name: "Veg Thali",
    category: "Lunch",
    price: 220,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 720, Protein: 16g, Carbs: 98g",
    allergens: "Wheat, Dairy",
    description: "Wholesome combo of Steamed Rice, 2 Butter Rotis, rich Dal Tadka, and seasonal dry Sabzi.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-ni-2",
    name: "Deluxe Thali",
    category: "Lunch",
    price: 300,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 920, Protein: 22g, Carbs: 118g",
    allergens: "Wheat, Dairy",
    description: "Premium lunch consisting of Butter Naan, Jeera Rice, Paneer Butter Masala, Dal Makhani, Sweet, and papad.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-ni-3",
    name: "Dal Tadka",
    category: "Lunch",
    price: 160,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 190, Protein: 9g, Carbs: 26g",
    allergens: "Dairy (Ghee / Butter optional)",
    description: "Yellow lentils slow cooked and tempered with cumin, garlic, and hot red chilies.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-ni-4",
    name: "Dal Fry",
    category: "Lunch",
    price: 170,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 210, Protein: 10g, Carbs: 28g",
    allergens: "None",
    description: "Creamy cooked split pigeon peas stir fried with onions, fresh tomatoes, and green cilantro.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-ni-5",
    name: "Dal Makhani",
    category: "Lunch",
    price: 220,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 340, Protein: 12g, Fat: 14g",
    allergens: "Dairy (Butter, Cream)",
    description: "Classic rich, creamy slow-cooked black lentils simmered overnight with butter and fresh cream.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-ni-6",
    name: "Jeera Rice",
    category: "Lunch",
    price: 140,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 240, Protein: 4g, Carbs: 48g",
    allergens: "None",
    description: "Fragrant basmati rice tossed with whole toasted cumin seeds and clarified butter.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-ni-7",
    name: "Veg Pulao",
    category: "Lunch",
    price: 170,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 260, Protein: 5g, Carbs: 51g",
    allergens: "None",
    description: "Aromatic rice dish prepared with spiced long grain basmati and assortment of vegetables.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-ni-8",
    name: "Paneer Pulao",
    category: "Lunch",
    price: 220,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 320, Protein: 11g, Carbs: 52g",
    allergens: "Dairy (Paneer)",
    description: "Mildly spiced basmati rice tossed with shallow-fried rich cottage cheese cubes.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-ni-9",
    name: "Veg Biryani",
    category: "Lunch",
    price: 200,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 370, Protein: 8g, Carbs: 62g",
    allergens: "Dairy",
    description: "Fragrant North-Indian style layered basmati rice infused with complex spices.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-ni-10",
    name: "Paneer Biryani (Lunch)",
    category: "Lunch",
    price: 250,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 450, Protein: 14g, Carbs: 64g",
    allergens: "Dairy (Paneer)",
    description: "Layers of spiced basmati rice and marinated rich cottage cheese slow cooked in a clay pot.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-ni-11",
    name: "Butter Naan",
    category: "Lunch",
    price: 50,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 220, Protein: 5g, Fat: 6g",
    allergens: "Wheat (Fluten), Dairy (Butter)",
    description: "Soft leavened refined flour flatbread cooked in clay tandoor oven, brushed with butter.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-ni-12",
    name: "Garlic Naan",
    category: "Lunch",
    price: 60,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 240, Protein: 5g, Fat: 7g",
    allergens: "Wheat, Dairy",
    description: "Leavened oven-baked flatbread infused with fresh minced garlic and herbs.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-ni-13",
    name: "Plain Naan",
    category: "Lunch",
    price: 45,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 190, Protein: 5g, Carbs: 38g",
    allergens: "Wheat",
    description: "Traditional soft and pillowy flatbread baked in the clay tandoor.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-ni-14",
    name: "Tandoori Roti",
    category: "Lunch",
    price: 35,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 110, Protein: 3g, Carbs: 22g",
    allergens: "Wheat",
    description: "Healthy whole wheat flour flatbread directly baked on clay oven walls.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-ni-15",
    name: "Butter Roti",
    category: "Lunch",
    price: 40,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 130, Protein: 3g, Fat: 3g",
    allergens: "Wheat, Dairy",
    description: "Clay-baked whole wheat flatbread layered with premium melted butter.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-ni-16",
    name: "Lachha Paratha",
    category: "Lunch",
    price: 60,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 260, Protein: 5g, Fat: 10g",
    allergens: "Wheat, Dairy",
    description: "Layered and flaky whole wheat flour flatbread cooked with warm ghee.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-ni-17",
    name: "Paneer Butter Masala",
    category: "Lunch",
    price: 260,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 390, Protein: 14g, Fat: 22g",
    allergens: "Dairy, Cashew",
    description: "Cubes of tender paneer cooked in rich tomato, butter, cashew, and cream based sweet gravy.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-ni-18",
    name: "Kadai Paneer",
    category: "Lunch",
    price: 250,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 370, Protein: 13g, Fat: 18g",
    allergens: "Dairy",
    description: "Paneer cubes tossed with crunchy bell peppers, onions in a spicy, freshly crushed kadai masala.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-ni-19",
    name: "Shahi Paneer",
    category: "Lunch",
    price: 260,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 410, Protein: 13g, Fat: 24g",
    allergens: "Dairy, Nuts",
    description: "Royal preparation of paneer in thick almonds, cashew, cardamom, and cream golden gravy.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-ni-20",
    name: "Palak Paneer",
    category: "Lunch",
    price: 240,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 310, Protein: 14g, Carbs: 11g",
    allergens: "Dairy",
    description: "Hearty cottage cheese cubes submerged in a thick, vibrant, and iron-rich pureed spinach sauce.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-ni-21",
    name: "Chole Masala",
    category: "Lunch",
    price: 180,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 240, Protein: 8g, Carbs: 38g",
    allergens: "None",
    description: "Piquant and dark spiced chickpeas cooked with onions, tomatoes, ginger, and amchoor powder.",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-ni-22",
    name: "Rajma Masala",
    category: "Lunch",
    price: 180,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 250, Protein: 9g, Carbs: 42g",
    allergens: "None",
    description: "Red kidney beans simmered beautifully in deep spicy onion-tomato gravy curry.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-ni-23",
    name: "Mixed Veg Curry",
    category: "Lunch",
    price: 180,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 190, Protein: 5g, Carbs: 22g",
    allergens: "None",
    description: "Stir fried cauliflower, peas, carrots, and beans in dry, highly spiced masala.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-ni-24",
    name: "Veg Kofta",
    category: "Lunch",
    price: 220,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 320, Protein: 6g, Fat: 14g",
    allergens: "Wheat, Dairy",
    description: "Deep fried mixed vegetable balls cooked inside thick spiced North-Indian sauce.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60"
  },

  // ==========================================
  //☕ EVENING MENU (SNACKS) - South Indian Snacks
  // ==========================================
  {
    id: "s-si-1",
    name: "Masala Vada",
    category: "Snacks",
    price: 40,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 180, Protein: 5g, Fat: 9g",
    allergens: "None",
    description: "Crispy crunchy fried fritters made of crushed chana dal, fennel seeds, and green curry leaves.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "s-si-2",
    name: "Medu Vada (Snacks)",
    category: "Snacks",
    price: 40,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 190, Protein: 6g, Fat: 11g",
    allergens: "None",
    description: "Savory black lentil crispy fritter, perfect with warm ginger tea.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "s-si-3",
    name: "Bonda",
    category: "Snacks",
    price: 45,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 210, Protein: 4g, Fat: 11g",
    allergens: "None",
    description: "Golden fried round fritters stuffed with seasoned mashed potatoes.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "s-si-4",
    name: "Bajji",
    category: "Snacks",
    price: 50,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 190, Protein: 4g, Fat: 10g",
    allergens: "Gram Flour (Besan)",
    description: "Crispy fried snack coated with chickpea batter, served with fresh coconut chutney.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "s-si-5",
    name: "Onion Pakoda",
    category: "Snacks",
    price: 60,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 220, Protein: 4g, Fat: 12g",
    allergens: "Gram Flour",
    description: "Crispy, deep-fried sliced onion strips coated lightly in spiced chickpea flour.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "s-si-6",
    name: "Banana Bajji",
    category: "Snacks",
    price: 50,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 180, Protein: 3g, Fat: 9g",
    allergens: "Gram Flour",
    description: "Raw banana slices dipped in spiced batter and crisp-fried.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "s-si-7",
    name: "Samosa",
    category: "Snacks",
    price: 30,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 190, Protein: 3g, Fat: 10g",
    allergens: "Wheat",
    description: "Triangular crispy fried pastry shell filled with spiced peas and potato mix.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "s-si-8",
    name: "Sundal",
    category: "Snacks",
    price: 45,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 130, Protein: 7g, Carbs: 18g",
    allergens: "None",
    description: "Boiled white chickpeas tossed gently with shredded coconut, mustard seeds, and curry leaves.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "s-si-9",
    name: "Murukku",
    category: "Snacks",
    price: 40,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 150, Protein: 3g, Fat: 8g",
    allergens: "None",
    description: "Very crunchy spiral-shaped rice flour snack seasoned with carom seeds (ajwain).",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "s-si-10",
    name: "Mixture",
    category: "Snacks",
    price: 40,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 160, Protein: 4g, Fat: 9g",
    allergens: "Peanuts, Gram Flour",
    description: "Crunchy South Indian savory mixture of gram flour noodles, fried peanuts, and cashews.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "s-si-11",
    name: "Kara Sev",
    category: "Snacks",
    price: 40,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 155, Protein: 4g, Fat: 9g",
    allergens: "Gram Flour",
    description: "Spicy and crisp fried gram-flour noodle strands heavily spiced with crushed black pepper.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
  },

  // ==========================================
  //☕ EVENING MENU (SNACKS) - North Indian Snacks
  // ==========================================
  {
    id: "s-ni-1",
    name: "Veg Samosa",
    category: "Snacks",
    price: 35,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 200, Protein: 4g, Fat: 10g",
    allergens: "Wheat",
    description: "North-Indian crispy pastry loaded with heavily spiced and herbed boiled potatoes.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "s-ni-2",
    name: "Kachori",
    category: "Snacks",
    price: 40,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 220, Protein: 5g, Fat: 12g",
    allergens: "Wheat",
    description: "Flaky round pastry stuffed with spicy dry lentils (Moong Dal) and savory spices.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "s-ni-3",
    name: "Aloo Tikki",
    category: "Snacks",
    price: 60,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 180, Protein: 3g, Fat: 7g",
    allergens: "None",
    description: "Crispy shallow-fried potato patties seasoned with cilantro, coriander, and sweet-sour chutneys.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "s-ni-4",
    name: "Paneer Pakoda",
    category: "Snacks",
    price: 90,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 290, Protein: 12g, Fat: 18g",
    allergens: "Dairy, Gram Flour",
    description: "Delicious cottage cheese cubes coated in herbed gram flour batter and deep fried.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "s-ni-5",
    name: "Veg Cutlet",
    category: "Snacks",
    price: 70,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 170, Protein: 4g, Carbs: 22g",
    allergens: "Wheat (Breadcrumbs)",
    description: "Crisp patties made from mashed potato, sweet peas, carrot, and beetroot, coated with breadcrumbs.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "s-ni-6",
    name: "Pav Bhaji",
    category: "Snacks",
    price: 150,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 420, Protein: 10g, Fat: 16g",
    allergens: "Wheat, Dairy (Butter)",
    description: "Thick mashed vegetable curry seasoned with special spices, served with warm buttery dinner rolls.",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "s-ni-7",
    name: "Dahi Puri",
    category: "Snacks",
    price: 90,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 240, Protein: 6g, Carbs: 38g",
    allergens: "Wheat, Dairy (Yogurt)",
    description: "Crisp puffed puris filled with potatoes, sweet tamarind, mint, chilled yogurt, and crunchy sev.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "s-ni-8",
    name: "Sev Puri",
    category: "Snacks",
    price: 80,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 210, Protein: 5g, Carbs: 34g",
    allergens: "Wheat",
    description: "Crisp flat puris topped with potato chunks, onions, colorful sweet and spicy chutneys, and fine sev.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "s-ni-9",
    name: "Bhel Puri",
    category: "Snacks",
    price: 70,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 160, Protein: 4g, Carbs: 28g",
    allergens: "Peanut",
    description: "Light-hearted street-food snack of puffed rice tossed with onions, tomatoes, and tangy chutneys.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "s-ni-10",
    name: "Pani Puri",
    category: "Snacks",
    price: 60,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 120, Protein: 3g, Carbs: 20g",
    allergens: "Wheat",
    description: "8 pieces of crisp hollow puris served with potato mash and spicy-sweet flavored water.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "s-ni-11",
    name: "Chole Chaat",
    category: "Snacks",
    price: 80,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 190, Protein: 7g, Carbs: 28g",
    allergens: "None",
    description: "Tangy and lip-smacking snack prepared with boiled white chickpeas, spices, and lemon juice.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "s-ni-12",
    name: "Corn Chaat",
    category: "Snacks",
    price: 90,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 150, Protein: 4g, Carbs: 26g",
    allergens: "Butter",
    description: "Steamed golden sweet corn tossed with butter, chaat masala, lemon, and fine onion.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
  },

  // ==========================================
  //🌙 DINNER MENU - South Indian Dinner
  // ==========================================
  {
    id: "d-si-1",
    name: "Plain Dosa (Dinner)",
    category: "Dinner",
    price: 50,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 165, Protein: 3g, Carbs: 29g",
    allergens: "None",
    description: "Golden crispy thin crepe served with sambar and fresh coconut chutneys.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "d-si-2",
    name: "Masala Dosa (Dinner)",
    category: "Dinner",
    price: 80,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 290, Protein: 6g, Carbs: 45g",
    allergens: "None",
    description: "Crispy golden crepe with savory smashed potato stuffing inside.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "d-si-3",
    name: "Onion Dosa (Dinner)",
    category: "Dinner",
    price: 80,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 220, Protein: 5g, Carbs: 38g",
    allergens: "None",
    description: "Crispy dosa layered with crunchy finely sliced fresh onions.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "d-si-4",
    name: "Ghee Roast (Dinner)",
    category: "Dinner",
    price: 90,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 250, Protein: 4g, Fat: 14g",
    allergens: "Dairy (Ghee)",
    description: "Crisp folded crepe roasted nicely with direct aromatic cow ghee.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "d-si-5",
    name: "Rava Dosa",
    category: "Dinner",
    price: 85,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 210, Protein: 4g, Carbs: 35g",
    allergens: "Wheat (Semolina)",
    description: "Net-textured crispy dosa made from semolina batter, black pepper, and ginger.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "d-si-6",
    name: "Set Dosa (Dinner)",
    category: "Dinner",
    price: 75,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 240, Protein: 6g, Carbs: 40g",
    allergens: "None",
    description: "Spongy, thick and cushiony dosas (3 pcs) served with traditional veg sagu.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "d-si-7",
    name: "Uttapam (Dinner)",
    category: "Dinner",
    price: 85,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 260, Protein: 6g, Carbs: 42g",
    allergens: "None",
    description: "Slightly thicker fermented pancake base topped with onion and chili.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "d-si-8",
    name: "Idiyappam (Dinner)",
    category: "Dinner",
    price: 75,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 150, Protein: 3g, Carbs: 30g",
    allergens: "None",
    description: "Steamed rice noodles, served with spiced vegetable stew.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "d-si-9",
    name: "Appam (Dinner)",
    category: "Dinner",
    price: 70,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 130, Protein: 2g, Carbs: 23g",
    allergens: "None",
    description: "Thin lacy-edge pancake with a cloud-soft thick center, served with coconut milk.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "d-si-10",
    name: "Veg Kurma",
    category: "Dinner",
    price: 150,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 180, Protein: 4g, Fat: 10g",
    allergens: "None",
    description: "Rich gravy curry made of blended coconut, cashew paste, and boiled green veggies.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "d-si-11",
    name: "Chapati (2)",
    category: "Dinner",
    price: 50,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 140, Protein: 4g, Carbs: 26g",
    allergens: "Wheat",
    description: "Healthy griddle cooked flatbreads made of pure whole wheat flour.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "d-si-12",
    name: "Parotta",
    category: "Dinner",
    price: 45,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 280, Protein: 6g, Fat: 12g",
    allergens: "Wheat (Maida)",
    description: "Multi-layered, flaky, soft, and crispy flatbread from Southern India, served with kurma.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "d-si-13",
    name: "Kothu Parotta",
    category: "Dinner",
    price: 180,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 420, Protein: 10g, Fat: 16g",
    allergens: "Wheat, Dairy",
    description: "Street-style shredded parotta chopped vigorously on iron griddle with rich spices and veggies.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "d-si-14",
    name: "Veg Fried Rice (Dinner)",
    category: "Dinner",
    price: 170,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 350, Protein: 6g, Carbs: 58g",
    allergens: "Soy",
    description: "Stir-fried rice tossed with spring onion, beans, capsicum, and oriental sauces.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "d-si-15",
    name: "Veg Noodles (Dinner)",
    category: "Dinner",
    price: 170,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 340, Protein: 6g, Carbs: 55g",
    allergens: "Wheat, Soy",
    description: "Delicious stir-fried noodles cooked with shredded seasonal greens and sesame oil.",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60"
  },

  // ==========================================
  //🌙 DINNER MENU - North Indian Dinner
  // ==========================================
  {
    id: "d-ni-1",
    name: "Butter Naan (Dinner)",
    category: "Dinner",
    price: 50,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 220, Protein: 5g, Fat: 6g",
    allergens: "Wheat, Dairy",
    description: "Tear-shaped soft naan bread glazed with salted pure butter.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "d-ni-2",
    name: "Garlic Naan (Dinner)",
    category: "Dinner",
    price: 60,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 240, Protein: 5g, Fat: 7g",
    allergens: "Wheat, Dairy",
    description: "Clay-baked refined flatbread topped with toasted garlic shreds.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "d-ni-3",
    name: "Tandoori Roti (Dinner)",
    category: "Dinner",
    price: 35,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 110, Protein: 3g, Carbs: 22g",
    allergens: "Wheat",
    description: "Unleavened whole wheat flatbread cleanly baked in a dynamic tandoor.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "d-ni-4",
    name: "Kulcha",
    category: "Dinner",
    price: 60,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 210, Protein: 5g, Carbs: 38g",
    allergens: "Wheat",
    description: "Soft refined flour flatbread garnished with black sesame seeds.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "d-ni-5",
    name: "Paneer Butter Masala (Dinner)",
    category: "Dinner",
    price: 260,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 390, Protein: 14g, Fat: 22g",
    allergens: "Dairy, Cashew",
    description: "Soft fresh paneer simmered inside butter rich creamy tomato curry gravy.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "d-ni-6",
    name: "Kadai Paneer (Dinner)",
    category: "Dinner",
    price: 250,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 370, Protein: 13g, Fat: 18g",
    allergens: "Dairy",
    description: "Cottage cheese and capsicum sautéed in thick spicy kadai masala spices.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "d-ni-7",
    name: "Shahi Paneer (Dinner)",
    category: "Dinner",
    price: 260,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 410, Protein: 13g, Fat: 24g",
    allergens: "Dairy, Nuts",
    description: "Royal sweet gravy of curd, onion, cashew, and golden saffron paneer.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "d-ni-8",
    name: "Palak Paneer (Dinner)",
    category: "Dinner",
    price: 240,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 310, Protein: 14g, Carbs: 11g",
    allergens: "Dairy",
    description: "Fresh spinach puree slow cooked with cubes of rich cottage cheese.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "d-ni-9",
    name: "Malai Kofta",
    category: "Dinner",
    price: 250,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 430, Protein: 9g, Fat: 28g",
    allergens: "Dairy, Cashew",
    description: "Deep fried paneer and potato balls (kofta) served in rich, creamy mild gravy.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "d-ni-10",
    name: "Veg Kolhapuri",
    category: "Dinner",
    price: 220,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 210, Protein: 5g, Carbs: 18g",
    allergens: "None",
    description: "Extremely spicy and rich mixed vegetable curry originating from Kolhapur.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "d-ni-11",
    name: "Mushroom Masala",
    category: "Dinner",
    price: 220,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 220, Protein: 7g, Carbs: 19g",
    allergens: "None",
    description: "Button mushrooms stir-fried in a deeply spiced onion tomato and ginger sauce.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "d-ni-12",
    name: "Dal Makhani (Dinner)",
    category: "Dinner",
    price: 220,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 340, Protein: 12g, Fat: 14g",
    allergens: "Dairy",
    description: "Buttery slow cooked overnight black lentils simmered with heavy cream.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "d-ni-13",
    name: "Jeera Rice (Dinner)",
    category: "Dinner",
    price: 140,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 240, Protein: 4g, Carbs: 48g",
    allergens: "None",
    description: "Fluffy basmati rice toasted with earthy cumin seeds and butter.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "d-ni-14",
    name: "Veg Pulao (Dinner)",
    category: "Dinner",
    price: 170,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 260, Protein: 5g, Carbs: 51g",
    allergens: "None",
    description: "Rice cooked with aromatic bay leaf, cardamoms, cloves, and mixed vegetables.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "d-ni-15",
    name: "Veg Biryani (Dinner)",
    category: "Dinner",
    price: 200,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 370, Protein: 8g, Carbs: 62g",
    allergens: "Dairy",
    description: "Authentic dum-layered saffron basmati rice with exotic Indian spices and veggies.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "d-ni-16",
    name: "Paneer Biryani (Dinner)",
    category: "Dinner",
    price: 250,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 450, Protein: 14g, Carbs: 64g",
    allergens: "Dairy (Paneer)",
    description: "Cottage cheese pieces slow baked on dum process with layered long grain rice.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=60"
  },

  // ==========================================
  //🍨 DESSERTS
  // ==========================================
  {
    id: "des-1",
    name: "Gulab Jamun",
    category: "Desserts",
    price: 60,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 150, Protein: 3g, Sugar: 24g",
    allergens: "Dairy, Wheat",
    description: "Deep fried paneer and milk-solid balls soaked in hot aromatic cardamom-saffron sugar syrup.",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "des-2",
    name: "Rasmalai",
    category: "Desserts",
    price: 90,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 190, Protein: 6g, Sugar: 20g",
    allergens: "Dairy, Pistachios",
    description: "Pistachio-garnished flattened paneer discs soaked in sweet thickened saffron cardamoms milk.",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "des-3",
    name: "Jalebi",
    category: "Desserts",
    price: 70,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 220, Protein: 2g, Sugar: 32g",
    allergens: "Wheat",
    description: "Spiral shaped crispy fried flour loops dunked into hot sugary syrup.",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "des-4",
    name: "Carrot Halwa",
    category: "Desserts",
    price: 100,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 210, Protein: 4g, Fat: 8g",
    allergens: "Dairy, Cashews",
    description: "Classic sweet carrot dessert cooked slowly with fresh milk, ghee, and roasted dry nuts.",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "des-5",
    name: "Gajar Halwa",
    category: "Desserts",
    price: 100,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 210, Protein: 4g, Fat: 8g",
    allergens: "Dairy, Almonds",
    description: "Traditional sweet dessert of grated winter red carrots and dry milk solids.",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "des-6",
    name: "Kesari (Desserts)",
    category: "Desserts",
    price: 50,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 220, Protein: 3g, Carbs: 38g",
    allergens: "Wheat (Rava), Dairy, Cashews",
    description: "Delightful orange semolina sweet cooked in rich clarified butter.",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "des-7",
    name: "Payasam",
    category: "Desserts",
    price: 70,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 180, Protein: 4g, Sugar: 22g",
    allergens: "Dairy, Vermicelli",
    description: "Southern sweet pudding of roasted vermicelli simmered in sweetened condensed milk.",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "des-8",
    name: "Rice Kheer",
    category: "Desserts",
    price: 80,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 170, Protein: 4g, Sugar: 21g",
    allergens: "Dairy, Almonds",
    description: "Rich traditional basmati rice simmered in thickened sweetened whole milk.",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "des-9",
    name: "Badam Kheer",
    category: "Desserts",
    price: 120,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 240, Protein: 6g, Sugar: 25g",
    allergens: "Dairy, Almonds",
    description: "Rich luxurious kheer made from real almond paste and cardamom flavor.",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "des-10",
    name: "Kulfi",
    category: "Desserts",
    price: 90,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 230, Protein: 5g, Sugar: 22g",
    allergens: "Dairy, Pistachios",
    description: "Traditional frozen milk confection loaded with saffron, cardamom, and nuts.",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=500&auto=format&fit=crop&q=60"
  },

  // ==========================================
  //🥤 BEVERAGES
  // ==========================================
  {
    id: "bev-1",
    name: "Tea",
    category: "Beverages",
    price: 20,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 45, Protein: 1g, Sugar: 8g",
    allergens: "Dairy (Milk)",
    description: "Strong brewed milk tea prepared with fresh CTC tea leaves.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "bev-2",
    name: "Coffee",
    category: "Beverages",
    price: 25,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 60, Protein: 2g, Sugar: 8g",
    allergens: "Dairy (Milk)",
    description: "Hot, energetic brewed milk coffee, perfect to restart your day.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "bev-3",
    name: "Filter Coffee",
    category: "Beverages",
    price: 35,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 70, Protein: 2g, Sugar: 9g",
    allergens: "Dairy (Milk)",
    description: "Authentic frothy South Indian coffee brewed from chicory-infused fresh coffee beans.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "bev-4",
    name: "Masala Tea",
    category: "Beverages",
    price: 30,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 55, Protein: 1.5g, Sugar: 9g",
    allergens: "Dairy (Milk)",
    description: "Aromatic Indian milk tea infused with cardamom, ginger, cloves, and cinnamon.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "bev-5",
    name: "Lemon Tea",
    category: "Beverages",
    price: 30,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 15, Protein: 0g, Sugar: 3g",
    allergens: "None",
    description: "Light and refreshing black tea infusion with freshly squeezed lemon juice.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "bev-6",
    name: "Green Tea",
    category: "Beverages",
    price: 40,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 2, Protein: 0g, Carbs: 0g",
    allergens: "None",
    description: "Healthy brewed green tea leaves rich in powerful antioxidants.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "bev-7",
    name: "Fresh Lime Juice",
    category: "Beverages",
    price: 50,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 60, Sugar: 12g",
    allergens: "None",
    description: "Refreshing cold drink made with freshly squeezed lemons, water, and sweet sugar syrup.",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "bev-8",
    name: "Sweet Lime Soda",
    category: "Beverages",
    price: 60,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 80, Sugar: 16g",
    allergens: "None",
    description: "Chilled sparkling carbonated soda loaded with lemon juice and sugar syrup.",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "bev-9",
    name: "Salt Lime Soda",
    category: "Beverages",
    price: 60,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 10, Sugar: 0g",
    allergens: "None",
    description: "Fizzy carbonated soda with squeezed lemon, rock salt, and spices.",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "bev-10",
    name: "Mango Juice",
    category: "Beverages",
    price: 90,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 120, Sugar: 26g",
    allergens: "None",
    description: "Creamy, rich and thick juice pulp extracted from sweet ripe alphanso mangoes.",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "bev-11",
    name: "Watermelon Juice",
    category: "Beverages",
    price: 90,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 80, Sugar: 14g",
    allergens: "None",
    description: "Pure refreshing juice of cold seeded watermelons, freshly pressed.",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "bev-12",
    name: "Orange Juice",
    category: "Beverages",
    price: 100,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 95, Sugar: 18g",
    allergens: "None",
    description: "Freshly squeezed high vitamin C juice made from sweet Nagpur oranges.",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "bev-13",
    name: "Pineapple Juice",
    category: "Beverages",
    price: 90,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 100, Sugar: 20g",
    allergens: "None",
    description: "Tangy sweet juice of ripe pineapples pressed cold with light black salt.",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "bev-14",
    name: "Apple Juice",
    category: "Beverages",
    price: 120,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 110, Sugar: 22g",
    allergens: "None",
    description: "Cold-pressed clear sweet juice from crisp delicious red apples.",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "bev-15",
    name: "Sweet Lassi",
    category: "Beverages",
    price: 90,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 180, Protein: 5g, Sugar: 22g",
    allergens: "Dairy (Curd)",
    description: "Creamy whipped sweet yogurt beverage flavored with cardamoms and rosewater.",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "bev-16",
    name: "Salt Lassi",
    category: "Beverages",
    price: 90,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 110, Protein: 5g, Carbs: 6g",
    allergens: "Dairy (Curd)",
    description: "Salty and tangy whipped yogurt beverage seasoned with dry roasted cumin powder.",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "bev-17",
    name: "Buttermilk",
    category: "Beverages",
    price: 40,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 40, Protein: 1.5g",
    allergens: "Dairy (Curd)",
    description: "Light spiced yogurt thin beverage seasoned with ginger, green chili, and cilantro.",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "bev-18",
    name: "Rose Milk",
    category: "Beverages",
    price: 60,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 140, Sugar: 18g",
    allergens: "Dairy (Milk)",
    description: "Creamy cold milk flavored sweet with rich aromatic rose syrup sweetener.",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "bev-19",
    name: "Badam Milk",
    category: "Beverages",
    price: 90,
    isVeg: true,
    isBestSeller: true,
    nutrition: "Cal: 180, Protein: 5g, Sugar: 15g",
    allergens: "Dairy, Almonds",
    description: "Chilled sweet milk cooked slowly with real almond pieces and saffron strands.",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "bev-20",
    name: "Mineral Water",
    category: "Beverages",
    price: 20,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 0, Minerals Active",
    allergens: "None",
    description: "Hygenically packed mineral rich pure drinking water.",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&auto=format&fit=crop&q=60"
  },

  // ==========================================
  // 🍗 NON-VEGETARIAN DISHES (ADDED)
  // ==========================================
  {
    id: "b-nv-1",
    name: "Egg Dosa",
    category: "Breakfast",
    price: 100,
    isVeg: false,
    isBestSeller: true,
    nutrition: "Cal: 220, Protein: 10g, Fat: 8g",
    allergens: "Egg",
    description: "Crispy South Indian dosa topped with a seasoned, beaten egg spread and black pepper.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-nv-2",
    name: "Chicken Kari Dosa",
    category: "Breakfast",
    price: 160,
    isVeg: false,
    isBestSeller: true,
    nutrition: "Cal: 320, Protein: 18g, Fat: 14g",
    allergens: "Egg",
    description: "Famous Madurai street-style thick rice crepe topped with egg and delicious minced chicken curry.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "b-nv-3",
    name: "Chicken Keema Paratha",
    category: "Breakfast",
    price: 140,
    isVeg: false,
    isBestSeller: false,
    nutrition: "Cal: 340, Protein: 16g, Fat: 12g",
    allergens: "Wheat",
    description: "Tandoor-cooked whole wheat paratha stuffed with delicious spiced minced chicken.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-nv-1",
    name: "Hyderabadi Chicken Biryani",
    category: "Lunch",
    price: 240,
    isVeg: false,
    isBestSeller: true,
    nutrition: "Cal: 540, Protein: 28g, Carbs: 65g",
    allergens: "Dairy",
    description: "Richly spiced long-grain basmati rice cooked on dum with tender marinated chicken and saffron.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-nv-2",
    name: "Tender Mutton Biryani",
    category: "Lunch",
    price: 320,
    isVeg: false,
    isBestSeller: true,
    nutrition: "Cal: 610, Protein: 32g, Fat: 20g",
    allergens: "Dairy",
    description: "Succulent, melt-in-mouth mutton pieces slow-cooked with basmati rice, aromatic spices, and mint.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-nv-3",
    name: "South Indian Non-Veg Meals",
    category: "Lunch",
    price: 240,
    isVeg: false,
    isBestSeller: false,
    nutrition: "Cal: 780, Protein: 35g, Carbs: 90g",
    allergens: "Fish, Egg",
    description: "Complete traditional meal serving steamed rice, rich Chicken Salna, Mutton Gravy, Fish Curry, and Appalam.",
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-nv-4",
    name: "Classic Butter Chicken",
    category: "Lunch",
    price: 280,
    isVeg: false,
    isBestSeller: true,
    nutrition: "Cal: 480, Protein: 24g, Fat: 28g",
    allergens: "Dairy, Cashew",
    description: "Clay-oven roasted chicken tikkas simmered in a rich, buttery, velvety tomato gravy.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-nv-5",
    name: "Andhra Chilli Chicken",
    category: "Lunch",
    price: 190,
    isVeg: false,
    isBestSeller: false,
    nutrition: "Cal: 320, Protein: 22g, Fat: 14g",
    allergens: "Soy",
    description: "Spicy Indo-Chinese style stir-fried chicken with green chillies, onions, and curry leaves.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "l-nv-6",
    name: "Kerala Fish Curry",
    category: "Lunch",
    price: 220,
    isVeg: false,
    isBestSeller: false,
    nutrition: "Cal: 290, Protein: 24g, Fat: 12g",
    allergens: "Fish",
    description: "Fresh fish cooked in a tangy coconut and red chili gravy flavored with Kudampuli (malabar tamarind).",
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "s-nv-1",
    name: "Spicy Chicken Samosa",
    category: "Snacks",
    price: 50,
    isVeg: false,
    isBestSeller: false,
    nutrition: "Cal: 220, Protein: 8g, Fat: 12g",
    allergens: "Wheat",
    description: "Crisp triangular pastries filled with delicious spiced minced chicken, onions, and fresh coriander.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "s-nv-2",
    name: "Kerala Egg Puff",
    category: "Snacks",
    price: 45,
    isVeg: false,
    isBestSeller: true,
    nutrition: "Cal: 240, Protein: 6g, Fat: 16g",
    allergens: "Wheat, Egg",
    description: "Flaky, golden baked puff pastry stuffed with boiled egg and spiced caramelized onion masala.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "s-nv-3",
    name: "Crispy Chicken Cutlet",
    category: "Snacks",
    price: 90,
    isVeg: false,
    isBestSeller: false,
    nutrition: "Cal: 210, Protein: 12g, Fat: 10g",
    allergens: "Wheat",
    description: "Minced chicken patties cooked with potatoes and whole spices, crumb-coated and deep fried.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "d-nv-1",
    name: "Egg Kothu Parotta",
    category: "Dinner",
    price: 160,
    isVeg: false,
    isBestSeller: false,
    nutrition: "Cal: 390, Protein: 14g, Fat: 15g",
    allergens: "Wheat, Egg",
    description: "Popular Tamil Nadu street food of shredded parotta stir-fried with eggs, spices, onions, and salna.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "d-nv-2",
    name: "Chicken Kothu Parotta",
    category: "Dinner",
    price: 210,
    isVeg: false,
    isBestSeller: true,
    nutrition: "Cal: 460, Protein: 22g, Fat: 18g",
    allergens: "Wheat, Egg",
    description: "Shredded layered flatbread scrambled on a hot griddle with spices, egg, and tender chicken chunks.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "d-nv-3",
    name: "Egg Fried Rice",
    category: "Dinner",
    price: 160,
    isVeg: false,
    isBestSeller: false,
    nutrition: "Cal: 410, Protein: 12g, Carbs: 55g",
    allergens: "Egg, Soy",
    description: "High-flame wok-tossed long-grain rice with scrambled egg, white pepper, and green spring onions.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "d-nv-4",
    name: "Chicken Noodles",
    category: "Dinner",
    price: 220,
    isVeg: false,
    isBestSeller: true,
    nutrition: "Cal: 480, Protein: 18g, Carbs: 58g",
    allergens: "Wheat, Egg, Soy",
    description: "Classic Indo-Chinese style noodles tossed in a sizzling wok with shredded chicken, egg, and soy sauce.",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "d-nv-5",
    name: "Kadai Chicken Curry",
    category: "Dinner",
    price: 260,
    isVeg: false,
    isBestSeller: false,
    nutrition: "Cal: 410, Protein: 26g, Fat: 18g",
    allergens: "None",
    description: "Succulent chicken cooked with freshly ground coriander seeds and dry red chillies in a traditional kadai.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60"
  }
];

// List of all requested non-veg dishes to add/restore as specified in user request
const extraRequestedDishesRaw = [
  // MORNING (BREAKFAST) - South Indian Non-Veg Breakfast
  { name: "Chicken Keema Dosa", price: 180, category: "Breakfast" as const, ingredients: "Dosa Batter, Chicken Keema, Onion, Spices" },
  { name: "Chicken Masala Dosa", price: 190, category: "Breakfast" as const, ingredients: "Dosa, Chicken Curry" },
  { name: "Egg Dosa", price: 120, category: "Breakfast" as const, ingredients: "Dosa Batter, Egg" },
  { name: "Double Egg Dosa", price: 150, category: "Breakfast" as const, ingredients: "Dosa Batter, 2 Eggs" },
  { name: "Chicken Uttapam", price: 180, category: "Breakfast" as const, ingredients: "Uttapam Batter, Chicken" },
  { name: "Egg Uttapam", price: 140, category: "Breakfast" as const, ingredients: "Uttapam Batter, Egg" },
  { name: "Chicken Idiyappam", price: 220, category: "Breakfast" as const, ingredients: "Rice Noodles, Chicken Curry" },
  { name: "Chicken Appam", price: 220, category: "Breakfast" as const, ingredients: "Appam, Chicken Stew" },
  { name: "Mutton Paya", price: 240, category: "Breakfast" as const, ingredients: "Goat Trotters, Spices" },
  { name: "Egg Idiyappam", price: 150, category: "Breakfast" as const, ingredients: "Rice Noodles, Egg" },
  { name: "Chicken Pongal", price: 180, category: "Breakfast" as const, ingredients: "Rice, Dal, Chicken" },
  { name: "Egg Parotta", price: 150, category: "Breakfast" as const, ingredients: "Parotta, Egg" },
  { name: "Chicken Kothu Parotta", price: 240, category: "Breakfast" as const, ingredients: "Parotta, Chicken" },
  { name: "Mutton Kothu Parotta", price: 280, category: "Breakfast" as const, ingredients: "Parotta, Mutton" },
  { name: "Egg Kothu Parotta", price: 180, category: "Breakfast" as const, ingredients: "Parotta, Egg" },

  // North Indian Non-Veg Breakfast
  { name: "Chicken Stuffed Paratha", price: 180, category: "Breakfast" as const, ingredients: "Wheat Flour, Chicken" },
  { name: "Egg Paratha", price: 140, category: "Breakfast" as const, ingredients: "Egg, Wheat Flour" },
  { name: "Chicken Keema Paratha", price: 190, category: "Breakfast" as const, ingredients: "Chicken Mince" },
  { name: "Mutton Keema Paratha", price: 220, category: "Breakfast" as const, ingredients: "Mutton Mince" },
  { name: "Chicken Bhature", price: 220, category: "Breakfast" as const, ingredients: "Chicken Curry, Bhature" },
  { name: "Egg Sandwich", price: 120, category: "Breakfast" as const, ingredients: "Bread, Egg" },
  { name: "Chicken Sandwich", price: 180, category: "Breakfast" as const, ingredients: "Chicken" },
  { name: "Chicken Roll", price: 180, category: "Breakfast" as const, ingredients: "Chicken, Roti" },
  { name: "Egg Roll", price: 140, category: "Breakfast" as const, ingredients: "Egg" },
  { name: "Chicken Kulcha", price: 220, category: "Breakfast" as const, ingredients: "Kulcha, Chicken" },

  // South Indian Non-Veg Lunch
  { name: "Chicken Meals", price: 280, category: "Lunch" as const, ingredients: "Rice, Chicken Curry, Rasam, Sambar" },
  { name: "Mutton Meals", price: 350, category: "Lunch" as const, ingredients: "Rice, Mutton Curry" },
  { name: "Fish Meals", price: 300, category: "Lunch" as const, ingredients: "Rice, Fish Curry" },
  { name: "Prawn Meals", price: 350, category: "Lunch" as const, ingredients: "Rice, Prawn Curry" },
  { name: "Chicken Biryani", price: 260, category: "Lunch" as const, ingredients: "Basmati Rice, Chicken" },
  { name: "Hyderabadi Chicken Biryani", price: 290, category: "Lunch" as const, ingredients: "Chicken, Basmati Rice" },
  { name: "Mutton Biryani", price: 340, category: "Lunch" as const, ingredients: "Goat Meat" },
  { name: "Hyderabadi Mutton Biryani", price: 360, category: "Lunch" as const, ingredients: "Goat Meat" },
  { name: "Fish Biryani", price: 320, category: "Lunch" as const, ingredients: "Fish" },
  { name: "Prawn Biryani", price: 360, category: "Lunch" as const, ingredients: "Prawns" },
  { name: "Egg Biryani", price: 180, category: "Lunch" as const, ingredients: "Egg" },
  { name: "Chicken Fried Rice", price: 220, category: "Lunch" as const, ingredients: "Rice, Chicken" },
  { name: "Egg Fried Rice", price: 180, category: "Lunch" as const, ingredients: "Rice, Egg" },
  { name: "Mixed Non-Veg Fried Rice", price: 320, category: "Lunch" as const, ingredients: "Chicken, Egg, Prawn" },
  { name: "Chicken Noodles", price: 220, category: "Lunch" as const, ingredients: "Noodles, Chicken" },
  { name: "Egg Noodles", price: 180, category: "Lunch" as const, ingredients: "Noodles, Egg" },
  { name: "Mixed Noodles", price: 320, category: "Lunch" as const, ingredients: "Chicken, Egg, Prawn" },

  // North Indian Non-Veg Lunch
  { name: "Butter Chicken", price: 320, category: "Lunch" as const, ingredients: "Chicken, Butter" },
  { name: "Chicken Tikka Masala", price: 320, category: "Lunch" as const, ingredients: "Chicken" },
  { name: "Chicken Curry", price: 260, category: "Lunch" as const, ingredients: "Chicken" },
  { name: "Kadai Chicken", price: 290, category: "Lunch" as const, ingredients: "Chicken" },
  { name: "Chicken Do Pyaza", price: 290, category: "Lunch" as const, ingredients: "Chicken, Onion" },
  { name: "Chicken Handi", price: 320, category: "Lunch" as const, ingredients: "Chicken" },
  { name: "Chicken Korma", price: 320, category: "Lunch" as const, ingredients: "Chicken" },
  { name: "Mutton Rogan Josh", price: 380, category: "Lunch" as const, ingredients: "Mutton" },
  { name: "Mutton Curry", price: 340, category: "Lunch" as const, ingredients: "Mutton" },
  { name: "Mutton Korma", price: 380, category: "Lunch" as const, ingredients: "Mutton" },
  { name: "Keema Masala", price: 320, category: "Lunch" as const, ingredients: "Chicken/Mutton Mince" },
  { name: "Fish Curry", price: 320, category: "Lunch" as const, ingredients: "Fish" },
  { name: "Fish Masala", price: 340, category: "Lunch" as const, ingredients: "Fish" },
  { name: "Prawn Masala", price: 380, category: "Lunch" as const, ingredients: "Prawns" },
  { name: "Prawn Curry", price: 380, category: "Lunch" as const, ingredients: "Prawns" },
  { name: "Egg Curry", price: 180, category: "Lunch" as const, ingredients: "Egg" },
  { name: "Egg Masala", price: 180, category: "Lunch" as const, ingredients: "Egg" },
  { name: "Chicken Pulao", price: 260, category: "Lunch" as const, ingredients: "Chicken" },
  { name: "Mutton Pulao", price: 340, category: "Lunch" as const, ingredients: "Mutton" },

  // South Indian Non-Veg Snacks
  { name: "Chicken 65", price: 240, category: "Snacks" as const, ingredients: "Chicken" },
  { name: "Chicken 555", price: 260, category: "Snacks" as const, ingredients: "Chicken" },
  { name: "Chicken Lollipop", price: 260, category: "Snacks" as const, ingredients: "Chicken Wings" },
  { name: "Pepper Chicken", price: 280, category: "Snacks" as const, ingredients: "Chicken" },
  { name: "Chilli Chicken", price: 260, category: "Snacks" as const, ingredients: "Chicken" },
  { name: "Dragon Chicken", price: 280, category: "Snacks" as const, ingredients: "Chicken" },
  { name: "Chicken Pakoda", price: 220, category: "Snacks" as const, ingredients: "Chicken" },
  { name: "Chicken Wings", price: 260, category: "Snacks" as const, ingredients: "Chicken Wings" },
  { name: "Egg Bajji", price: 120, category: "Snacks" as const, ingredients: "Egg" },
  { name: "Fish Fry", price: 280, category: "Snacks" as const, ingredients: "Fish" },
  { name: "Fish Fingers", price: 300, category: "Snacks" as const, ingredients: "Fish" },
  { name: "Prawn Fry", price: 340, category: "Snacks" as const, ingredients: "Prawns" },
  { name: "Crab Lollipop", price: 380, category: "Snacks" as const, ingredients: "Crab" },

  // North Indian Non-Veg Snacks
  { name: "Chicken Tikka", price: 300, category: "Snacks" as const, ingredients: "Chicken" },
  { name: "Tandoori Chicken Half", price: 340, category: "Snacks" as const, ingredients: "Chicken" },
  { name: "Tandoori Chicken Full", price: 620, category: "Snacks" as const, ingredients: "Whole Chicken" },
  { name: "Chicken Seekh Kebab", price: 300, category: "Snacks" as const, ingredients: "Chicken Mince" },
  { name: "Mutton Seekh Kebab", price: 340, category: "Snacks" as const, ingredients: "Mutton" },
  { name: "Reshmi Kebab", price: 320, category: "Snacks" as const, ingredients: "Chicken" },
  { name: "Malai Chicken Tikka", price: 340, category: "Snacks" as const, ingredients: "Chicken" },
  { name: "Afghani Chicken", price: 360, category: "Snacks" as const, ingredients: "Chicken" },
  { name: "Chicken Shawarma", price: 220, category: "Snacks" as const, ingredients: "Chicken" },
  { name: "Chicken Momos", price: 180, category: "Snacks" as const, ingredients: "Chicken" },
  { name: "Chicken Spring Roll", price: 180, category: "Snacks" as const, ingredients: "Chicken" },
  { name: "Fish Tikka", price: 340, category: "Snacks" as const, ingredients: "Fish" },

  // South Indian Non-Veg Dinner
  { name: "Chicken Chettinad", price: 320, category: "Dinner" as const, ingredients: "Chicken" },
  { name: "Mutton Chukka", price: 360, category: "Dinner" as const, ingredients: "Mutton" },
  { name: "Crab Masala", price: 420, category: "Dinner" as const, ingredients: "Crab" },
  { name: "Egg Roast", price: 180, category: "Dinner" as const, ingredients: "Egg" },

  // North Indian Non-Veg Dinner
  { name: "Chicken Lababdar", price: 340, category: "Dinner" as const, ingredients: "Chicken" },
  { name: "Butter Naan", price: 50, category: "Dinner" as const, ingredients: "Flour, Butter" },
  { name: "Garlic Naan", price: 60, category: "Dinner" as const, ingredients: "Flour, Garlic" },
  { name: "Tandoori Roti", price: 35, category: "Dinner" as const, ingredients: "Wheat Flour" },

  // TANDOOR & GRILL SPECIALS
  { name: "Tangdi Kebab", price: 320, category: "Snacks" as const, ingredients: "Chicken Drumsticks" },

  // SEAFOOD SPECIALS
  { name: "Crab Curry", price: 420, category: "Dinner" as const, ingredients: "Crab" },
  { name: "Squid Fry", price: 340, category: "Snacks" as const, ingredients: "Squid" },
  { name: "Squid Pepper Fry", price: 360, category: "Snacks" as const, ingredients: "Squid" }
];

// Helper to determine image url dynamically
const getImageForDish = (name: string): string => {
  const n = name.toLowerCase();
  if (n.includes("biryani")) return "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=60";
  if (n.includes("dosa")) return "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop&q=60";
  if (n.includes("curry") || n.includes("masala") || n.includes("chettinad") || n.includes("butter")) return "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=60";
  if (n.includes("paratha") || n.includes("roti") || n.includes("naan") || n.includes("kulcha") || n.includes("parotta")) return "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60";
  if (n.includes("kebab") || n.includes("tikka") || n.includes("tandoori") || n.includes("lollipop") || n.includes("wings") || n.includes("fry") || n.includes("65") || n.includes("555")) return "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=500&auto=format&fit=crop&q=60";
  if (n.includes("meals")) return "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=500&auto=format&fit=crop&q=60";
  if (n.includes("noodles") || n.includes("fried rice") || n.includes("rice") || n.includes("pulao")) return "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60";
  return "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60";
};

// Helper to determine allergens based on ingredients
const getAllergens = (name: string, ingredients: string): string => {
  const items: string[] = [];
  const content = (name + " " + ingredients).toLowerCase();
  if (content.includes("egg")) items.push("Egg");
  if (content.includes("wheat") || content.includes("flour") || content.includes("bhature") || content.includes("parotta") || content.includes("paratha") || content.includes("naan") || content.includes("kulcha")) items.push("Wheat");
  if (content.includes("butter") || content.includes("ghee") || content.includes("paneer") || content.includes("stew") || content.includes("curd") || content.includes("milk")) items.push("Dairy");
  if (content.includes("fish")) items.push("Fish");
  if (content.includes("prawn")) items.push("Prawns");
  if (content.includes("crab")) items.push("Crab");
  if (content.includes("squid")) items.push("Squid");
  return items.length > 0 ? items.join(", ") : "None";
};

// Map extra requested items to full MenuItem interface
const processedExtraDishes: MenuItem[] = extraRequestedDishesRaw.map((dish, idx) => {
  // Determine if it is vegetarian (culinary accuracy: Naans and Rotis are Veg, all meat/eggs are Non-Veg)
  const isVeg = !(/chicken|mutton|egg|meat|fish|prawn|crab|squid|paya|keema|tikka|kebab|lollipop|wings|shawarma|pep|shredded/i.test(dish.name));
  
  return {
    id: `req-nv-${idx + 1}`,
    name: dish.name,
    category: dish.category,
    price: dish.price,
    isVeg,
    isBestSeller: idx % 4 === 0, // dynamic variety
    nutrition: isVeg ? "Cal: 180, Carbs: 35g, Protein: 4g" : `Cal: 320, Protein: 18g, Fat: 12g`,
    allergens: getAllergens(dish.name, dish.ingredients),
    description: `Flavorable freshly prepared ${dish.name} made with authentic ingredients: ${dish.ingredients}.`,
    image: getImageForDish(dish.name)
  };
});

// Deduplicate full combined list so that identical dish names within the same category don't double-exist
const finalCombinedMap = new Map<string, MenuItem>();

// First put initialMenuRaw items (both original veg and original non-veg)
for (const item of initialMenuRaw) {
  const key = `${item.name.trim().toLowerCase()}-${item.category}`;
  finalCombinedMap.set(key, item);
}

// Then put processedExtraDishes, overwriting or updating with correct user-specified parameters
for (const item of processedExtraDishes) {
  const key = `${item.name.trim().toLowerCase()}-${item.category}`;
  finalCombinedMap.set(key, item);
}

export const initialMenu: MenuItem[] = Array.from(finalCombinedMap.values());

