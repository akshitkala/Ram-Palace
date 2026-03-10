// src/Data/menu.js
// Complete menu extracted from GD Foods India / Basti Ram Palace brochure

export const menuCategories = [
  {
    id: "beverages",
    slug: "beverages",
    icon: "🥤",
    label: "Beverages",
    subcategories: [
      {
        title: "Shakes & Mocktails",
        items: [
          "Water Bottle (250ml)", "Soft Drinks", "Vanilla Shake",
          "Strawberry Shake", "Chocolate Shake", "Mango Shake",
          "Chiku Shake", "Oreo Shake", "Sharifa Shake",
          "Vergin Mojito", "Pina Colada", "Blue Angle",
          "Green Vally", "Mix Juice", "Fresh Orange Juice",
          "Fresh Watermelon Juice", "Sweet Lime", "Red Guava", "Black Grapes",
        ],
      },
      {
        title: "Hot Drinks",
        items: ["Masala Kullad Tea", "Espresso Coffee"],
      },
      {
        title: "Coffee Parlour",
        items: [
          "Fresh Beans Coffee", "Cappuccino", "Mochaccino",
          "Iced Tea", "Cold Coffee", "Lemon Tea", "Cookies",
        ],
      },
    ],
  },
  {
    id: "soups-salads",
    slug: "soups-salads",
    icon: "🫕",
    label: "Soups & Salads",
    subcategories: [
      {
        title: "Soups",
        items: [
          "Cream of Tomato Soup", "Vegetable Sweet Corn Soup",
          "Vegetable Hot 'N' Sour", "Vegetable Manchow Soup",
          "Noodles Soup", "Tamatar aur Dhaniya ka Shorba",
        ],
      },
      {
        title: "Salads",
        items: [
          "Garden Green Salad", "Kachumbar Salad", "Russian Salad",
          "Sweet Corn Salad", "Mix Sprout Salad", "Aloo Chana Chaat",
          "Pasta & Macaroni Salad", "Onion Slice & Green Chilli",
          "Sirka Onion", "Beetroot Salad", "Mix Fruit Salad",
          "Mango Pickle, Green Chilli Pickle, Carrot Pickle, Shalgum",
          "Mango Chutney", "Mirch ka Achar",
          "India Green Salad (Fingers served separately)",
          "Chickpeas with Ginger & Tomatoes",
          "Vinegar Onions, Laccha Onion",
          "Chopped Roast Garlic, Ginger Juliennes, Green Chillies, Lemon Wedge",
        ],
      },
    ],
  },
  {
    id: "fruits",
    slug: "fruits",
    icon: "🍉",
    label: "Fruits",
    subcategories: [
      {
        title: "Indian Fruits",
        items: [
          "Mango", "Pineapple", "Papaya", "Banana",
          "Strawberry", "Chikku", "Litchi", "Watermelon", "Dates", "Sarda",
        ],
      },
      {
        title: "Imported Fruits",
        items: [
          "Australian Grapes", "Guava", "Kiwi", "Apple",
          "Dragon Fruit", "Pears", "Mini Orange", "Plum", "Fuji Apple",
        ],
      },
    ],
  },
  {
    id: "savoury-house",
    slug: "savoury-house",
    icon: "🍽️",
    label: "The Savoury House",
    subcategories: [
      {
        title: "Chaat & Street Food",
        items: [
          "Gol Gappe (served with three types of water)",
          "Dahi Bhalla with Papri",
          "Crispy Aloo Tikki with Chole (served with Dal, Matar & Paneer)",
          "Moong Dal Paneer Chila",
          "Pao Bhaji",
          "Matar Kulcha with Kachori",
          "English Dry Fruits Chaat",
          "Palak Patta Chaat",
          "Khajoor ki Chaat",
          "Muradabadi Dal with Biscuit Roti",
          "Kaathi Kebab + Roomali Roti",
          "Pulao with Palak Paneer & Chole",
          "Chole Bhature",
        ],
      },
    ],
  },
  {
    id: "snacks",
    slug: "snacks",
    icon: "🍢",
    label: "Snacks & Starters",
    note: "All served with Mint Chutney and Tomato Ketchup",
    subcategories: [
      {
        title: "Tandoori & Tikka",
        items: [
          "Paneer Tikka", "Paneer Achari Tikka", "Mushroom Tikka",
          "Tandoori Aloo", "Tandoori Bharwan Aloo",
          "Tandoori Broccoli", "Tandoori Pineapple", "Tawe ke Tikke",
        ],
      },
      {
        title: "Kebabs & Crispy",
        items: [
          "Masala Soya Chaap", "Afghani Soya Chaap",
          "Honey Chilli Potato", "Chilli Potato", "Chilli Paneer",
          "Hara Bhara Kebab", "Veg Seekh Kebab",
          "Dahi ke Kebab", "Dahi ke Sholey", "Veg Cutlet",
        ],
      },
      {
        title: "Bites & Rolls",
        items: [
          "Spring Rolls", "French Fries", "Veg Manchurian",
          "Cheese Balls", "Cocktail Samosa", "Cocktail Kachori", "Mix Pakora",
        ],
      },
    ],
  },
  {
    id: "live-stations",
    slug: "live-stations",
    icon: "🌍",
    label: "Live Stations",
    subcategories: [
      {
        title: "Stone-Fired Pizzeria",
        items: [
          "Thin-Crust Pizza",
          "Cheese & Tomato",
          "Veggie Lover's Pizza (Mushroom, Tomato, Capsicum & Cheese)",
          "Farm House Pizza (Margherita & Cheese loaded)",
          "Various Garlic Breads",
        ],
      },
      {
        title: "Italian Live — Pasta Bar",
        items: [
          "Choice of Pasta: Penne / Fusilli / Farfalle",
          "Sauces: Arrabiatta / Mushroom Creamy / Cheese",
          "Toppings: Broccoli, Fresh Beans, Baby Corn, Mushroom, Bell Pepper, Olives, Herbs & Cheese",
        ],
      },
      {
        title: "Chinese Tadka",
        items: [
          "Hakka Noddles", "Veg Manchurian",
          "Veg Fried Rice", "Chilli Paneer", "Garlic Tadka Noodles",
        ],
      },
      {
        title: "South Indian Corner",
        items: [
          "Dosa / Rava Masala / Butter Masala",
          "Idli Sambhar", "Medu Vada", "Dal Vada",
          "Lemon Rice (served with curd)", "Tomato Rice", "Coconut Chutney",
        ],
      },
      {
        title: "Chandni Chowk Special",
        items: [
          "Bedmi Poori (served with Aloo Sabji)",
          "Sitafal ki Sabji (with Long ki Chutney)",
        ],
      },
      {
        title: "Agra ke Paranthe",
        items: [
          "Paneer Mava Dry Fruit Parantha",
          "Mix Veg Parantha", "Onion Parantha", "Gobhi Parantha",
          "(served with curd & pickle)",
        ],
      },
      {
        title: "Dim Sum",
        items: [
          "Crystal — Mushroom and Bok Choy",
          "Regular — Mixed Vegetable in Chilli Oil",
          "Five Spice Vegetables",
        ],
      },
    ],
  },
  {
    id: "indian-mains",
    slug: "indian-mains",
    icon: "🍛",
    label: "Indian Vegetarian Mains",
    subcategories: [
      {
        title: "Paneer & Vegetable",
        items: [
          "Paneer Lababdar", "Kadhai Paneer", "Malai Kofta Nargisi",
          "Mix Vegetable / Navratan Korma", "Matar Mushroom",
          "Pindi Chole", "Dum Aloo", "Palak Corn Paneer",
          "Kaju Matar Makhana Korma", "Soyabean Masala Chaap",
          "Paneer Bhurji", "Rajma Masala", "Aloo Methi",
          "Bhindi Kurkuri", "Sarson ka Saag (seasonal)", "Tinda Masala (seasonal)",
        ],
      },
      {
        title: "Dal",
        items: ["Dal Makhani", "Dal Tadka with Tawa Roti"],
      },
    ],
  },
  {
    id: "breads-rice",
    slug: "breads-rice",
    icon: "🫓",
    label: "Breads, Rice & Raita",
    subcategories: [
      {
        title: "Indian Breads",
        items: [
          "Butter Naan", "Garlic Naan", "Pudina Naan",
          "Churchur Naan", "Baby Naan", "Aloo + Onion Kulcha",
          "Tandoori Roti", "Missi Roti", "Khasta Roti",
          "Laccha Paratha", "Tawa Roti", "Live Poori",
        ],
      },
      {
        title: "Rice & Pulao",
        items: [
          "Jeera Rice", "Steam Rice", "Peas Pulao",
          "Kashmiri Pulao", "Veg Pulao", "Veg Biryani",
        ],
      },
      {
        title: "Raita",
        items: [
          "Plain Curd", "Boondi Raita", "Mix Raita",
          "Bathva Raita", "Pineapple Raita", "Fruit Raita",
          "Burani Raita", "Masala Chach",
        ],
      },
    ],
  },
  {
    id: "desserts",
    slug: "desserts",
    icon: "🍮",
    label: "Desserts",
    subcategories: [
      {
        title: "Hot Serving",
        items: [
          "Gulab Jamun", "Moong Dal Ka Halwa", "Gajar ka Halwa",
          "Badam ka Halwa", "Chukandar ka Halwa", "Coconut Halwa",
          "Jalebi with Rabri", "Mathura ka Kadhai Doodh",
        ],
      },
      {
        title: "Cold Serving",
        items: [
          "Ras Malai", "Raj Bhog", "Gulab Kheer", "Shahi Halwa",
          "Tila Kulfi", "Kulfi Mania (Aam, Kesar, Pista, Anar, Cream)",
          "Kulfi Faluda", "Ice Cream (Vanilla, Strawberry)", "Shahi Tukda",
        ],
      },
      {
        title: "Parlour & Counters",
        items: [
          "Ice Cream Parlour with Cold Stone Ice Cream (served with Hot Chocolate & Nuts)",
          "Cake and Pastry Counter",
          "Pan Shoppe (Silver Coated Pan & Mouth Fresheners)",
        ],
      },
    ],
  },
  {
    id: "pheron-service",
    slug: "pheron-service",
    icon: "☕",
    label: "Pheron Pe Service",
    note: "Welcome service — served as guests arrive",
    subcategories: [
      {
        title: "Welcome Bites",
        items: [
          "Espresso Coffee", "Soft Drinks & Water Bottles",
          "Salted Kaju", "Masala Badam",
          "Assorted Biscuits", "Chocolate Bites",
        ],
      },
    ],
  },
];