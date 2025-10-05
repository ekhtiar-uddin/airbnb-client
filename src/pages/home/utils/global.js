export const recentSearches = [
  {
    icon: "🏛️",
    title: "Rome",
    details: "Nov 10 – 14 · 3 guests",
  },
  {
    icon: "🌉",
    title: "Istanbul",
    details: "Oct 7 – 9 · 3 guests",
  },
  {
    icon: "🏨",
    title: "Toronto",
    details: "Oct 1 – 2 · 5 guests",
  },
];

export const suggestedDestinations = [
  {
    icon: "🗼",
    title: "Paris, France",
    details: "For sights like Eiffel Tower",
  },
  {
    icon: "🏰",
    title: "London, United Kingdom",
    details: "Family friendly",
  },
  {
    icon: "🏯",
    title: "Bangkok, Thailand",
    details: "Family friendly",
  },
  {
    icon: "🏙️",
    title: "São Paulo, Brazil",
    details: "Places to stay in São Paulo",
  },
  {
    icon: "🗽",
    title: "New York, United States",
    details: "Urban adventures",
  },
  {
    icon: "🕌",
    title: "Dubai, United Arab Emirates",
    details: "Luxury getaways",
  },
  {
    icon: "🏖️",
    title: "Bali, Indonesia",
    details: "Beach and relaxation",
  },
];

// Static place info for widget (can be used to seed MongoDB)
// global.js
// _id: "1",
export const staticPlace = {
  title: "A quiet little corner in the heart of Paris",
  subTitle: "Entire rental unit in Paris, France",
  cardTitle: "Room in Notre Dame",
  monthlyBill: 1611,
  squareFeet: 500,
  cardImage:
    "https://a0.muscache.com/im/pictures/32559674/88451ba3_original.jpg?im_w=1200",
  address: "123 Mountain Rd, Hilltown",

  host: {
    name: "Isabella",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella",
    isSuperhost: true,
    yearsHosting: 1,
    reviewCount: 182,
    rating: 4.97,
    responseRate: 100,
    responseTime: "within an hour",
    location: "Paris, France",
    bio: "I am passionate about Paris and I love films, reading a good book, hanging out with friends and a good laughter. Welcome to my place!",
  },
  badges: [
    {
      icon: "award",
      title: "Top 5% of homes",
      description:
        "This home is highly ranked based on ratings, reviews, and reliability.",
    },
    {
      icon: "key",
      title: "Exceptional check-in experience",
      description: "Recent guests gave the check-in process a 5-star rating.",
    },
    {
      icon: "location",
      title: "Unbeatable location",
      description:
        "100% of guests in the past year gave this location a 5-star rating.",
    },
  ],
  location: {
    address: "Beacon Hill",
    city: "Boston",
    state: "MA",
    country: "USA",
    postalCode: "02108",
    coordinates: {
      type: "Point",
      coordinates: [-71.0589, 42.3601],
    },
  },
  aboutSpace: {
    briefDescription: [
      "Two steps from Parc des Buttes-Chaumont Near metro Ourcq (line 5) 20 min from the center (Chatêlet, Les Halles)",
      "Fully renovated studio of 20m² Unobstructed view of the rooftops of Paris Quiet and bright, southwest facing...",
    ],

    fullDescription:
      "Two steps from Parc des Buttes-Chaumont Near metro Ourcq (line 5) 20 min from the center (Chatêlet, Les Halles) Fully renovated studio of 20m² Unobstructed view of the rooftops of Paris Quiet and bright, southwest facing Suitable for business travelers or urban explorers.",

    spaceDetails: {
      floor: "6th floor without elevator",
      bed: "Queen pull-out bed (160 x 200)",
      kitchen: "Separate, full kitchen",
      workspace: "Dedicated desk area with fiber",
    },

    guestAccess: {
      description:
        "Two steps from Parc des Buttes-Chaumont 20 min from the center (Chatêlet, Les Halles) 15min from Gare du Nord by metro.",
      nearbyStations: [
        { line: "Line 5 Ourcq", walkTime: "5 min walk" },
        { line: "Line 7Bis Botzaris", walkTime: "8 min walk" },
        { line: "Line 11 Place des Fêtes", walkTime: "15 min walk" },
      ],
      byCar: "4 min from Périphérique Porte de Pantin",
    },

    otherNotes:
      "I rent exclusively on a mobility lease, so with reasons for stay such as: training, travel or professional mobility.",

    registrationDetails:
      'Available with a mobility lease only ("bail mobilité")',
  },
  sleepingArrangementsData: [
    {
      id: 1,
      title: "Bedroom",
      description: "1 queen bed",
      image: "https://picsum.photos/800/600?random=1",
    },
    {
      id: 2,
      title: "Living room",
      description: "1 couch",
      image: "https://picsum.photos/800/600?random=2",
    },
  ],
  photoCategories: [
    {
      label: "Shared living room",
      key: "livingroom",
      photos: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
        "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800",
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800",
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800",
        "https://images.unsplash.com/photo-1615875605825-5eb9bb5d52ac?w=800",
      ],
    },
    {
      label: "Shared full kitchen",
      key: "kitchen",
      photos: [
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
        "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800",
        "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800",
      ],
    },
    {
      label: "Bedroom",
      key: "bedroom",
      photos: [
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800",
      ],
      description: "Single bed",
    },
    {
      label: "Shared full bathroom",
      key: "bathroom",
      photos: [
        "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800",
      ],
    },
    {
      label: "Shared exterior",
      key: "exterior",
      photos: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
      ],
    },
    {
      label: "Additional photos",
      key: "additional",
      photos: [
        "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800",
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800",
      ],
    },
  ],
  accommodationType: "1 single bed • Shared bathroom",
  reviews: 541,
  ratings: 4.95,
  description:
    "A perfect getaway home with stunning mountain views and modern amenities.",
  checkIn: "14:00",
  checkOut: "11:00",

  price: 120,
  extraInfo: "No pets. Please respect quiet hours after 10pm.",

  amenitiesData: {
    featured: [
      { id: 1, name: "Kitchen", icon: "UtensilsCrossed" },
      { id: 2, name: "Wifi", icon: "Wifi" },
      { id: 3, name: "Dedicated workspace", icon: "Laptop" },
      { id: 4, name: "Pets allowed", icon: "PawPrint" },
      { id: 5, name: "24 inch HDTV with Netflix, Chromecast", icon: "Tv" },
      { id: 6, name: "Boulanger refrigerator", icon: "Refrigerator" },
      { id: 7, name: "Microwave", icon: "Microwave" },
      { id: 8, name: "Long term stays allowed", icon: "Calendar" },
      { id: 9, name: "Paid street parking off premises", icon: "Car" },
      {
        id: 10,
        name: "Carbon monoxide alarm",
        icon: "AlertCircle",
        unavailable: true,
      },
    ],

    categories: [
      {
        title: "Bathroom",
        items: [
          { name: "Cleaning products", icon: "Sparkles" },
          { name: "Shampoo", icon: "ShowerHead" },
          { name: "Body soap", icon: "Waves" },
          { name: "Hot water", icon: "Thermometer" },
          { name: "Shower gel", icon: "ShowerHead" },
        ],
      },
      {
        title: "Bedroom and laundry",
        items: [
          {
            name: "Essentials",
            icon: "Bed",
            description: "Towels, bed sheets, soap, and toilet paper",
          },
          { name: "Hangers", icon: "Shirt" },
          { name: "Bed linens", icon: "Bed", description: "Cotton linens" },
          { name: "Extra pillows and blankets", icon: "Bed" },
          { name: "Room-darkening shades", icon: "Wind" },
          { name: "Clothing storage: walk-in closet", icon: "Shirt" },
        ],
      },
      {
        title: "Entertainment",
        items: [
          { name: "Ethernet connection", icon: "Wifi" },
          { name: "24 inch HDTV with Netflix, Chromecast", icon: "Tv" },
          { name: "Books and reading material", icon: "Bed" },
        ],
      },
      {
        title: "Heating and cooling",
        items: [{ name: "Radiant heating", icon: "Thermometer" }],
      },
      {
        title: "Home safety",
        items: [
          { name: "Smoke alarm", icon: "AlertCircle" },
          { name: "First aid kit", icon: "Shield" },
        ],
      },
      {
        title: "Internet and office",
        items: [
          { name: "Wifi", icon: "Wifi" },
          {
            name: "Dedicated workspace",
            icon: "Laptop",
            description: "In a private space with a monitor",
          },
        ],
      },
      {
        title: "Kitchen and dining",
        items: [
          {
            name: "Kitchen",
            icon: "UtensilsCrossed",
            description: "Space where guests can cook their own meals",
          },
          { name: "Boulanger refrigerator", icon: "Refrigerator" },
          { name: "Microwave", icon: "Microwave" },
          {
            name: "Cooking basics",
            icon: "UtensilsCrossed",
            description: "Pots and pans, oil, salt and pepper",
          },
          {
            name: "Dishes and silverware",
            icon: "UtensilsCrossed",
            description: "Bowls, chopsticks, plates, cups, etc.",
          },
          { name: "Freezer", icon: "Refrigerator" },
          { name: "Hot water kettle", icon: "Coffee" },
          { name: "Wine glasses", icon: "UtensilsCrossed" },
          { name: "Baking sheet", icon: "UtensilsCrossed" },
          { name: "Coffee", icon: "Coffee" },
        ],
      },
      {
        title: "Location features",
        items: [{ name: "Laundromat nearby", icon: "MapPin" }],
      },
      {
        title: "Parking and facilities",
        items: [{ name: "Paid street parking off premises", icon: "Car" }],
      },
      {
        title: "Services",
        items: [
          {
            name: "Pets allowed",
            icon: "PawPrint",
            description: "Assistance animals are always allowed",
          },
          {
            name: "Long term stays allowed",
            icon: "Calendar",
            description: "Allow stay for 28 days or more",
          },
          { name: "Cleaning available during stay", icon: "Sparkles" },
          { name: "Host greets you", icon: "User" },
        ],
      },
      {
        title: "Not included",
        items: [
          {
            name: "Exterior security cameras on property",
            icon: "Shield",
            unavailable: true,
          },
          { name: "Washer", icon: "WashingMachine", unavailable: true },
          { name: "Dryer", icon: "Wind", unavailable: true },
          { name: "Air conditioning", icon: "CloudOff", unavailable: true },
          {
            name: "Carbon monoxide alarm",
            icon: "AlertCircle",
            unavailable: true,
            note: "This place may not have a carbon monoxide detector. Reach out to the host with any questions.",
          },
        ],
      },
    ],
  },
  reviewsData: {
    overallRating: 4.95,
    totalReviews: 37,
    isGuestFavorite: true,
    topPercentage: 10,

    ratings: [
      { stars: 5, count: 450 },
      { stars: 4, count: 50 },
      { stars: 3, count: 10 },
      { stars: 2, count: 5 },
      { stars: 1, count: 2 },
    ],

    categories: [
      { name: "Cleanliness", score: 5.0, icon: "Sparkles" },
      { name: "Accuracy", score: 5.0, icon: "CheckCircle" },
      { name: "Check-in", score: 5.0, icon: "KeyRound" },
      { name: "Communication", score: 5.0, icon: "MessageSquare" },
      { name: "Location", score: 5.0, icon: "MapPin" },
      { name: "Value", score: 4.8, icon: "Tag" },
    ],

    reviews: [
      {
        id: 1,
        userName: "Etty",
        userLocation: null,
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Etty",
        yearsOnAirbnb: 9,
        date: "August 2025",
        rating: 5,
        comment:
          "The room matched the photos exactly and was definitely worth the price. The amenities provided were very complete and met all of our needs during the stay. The host was also very responsive and quick to reply to any messages, which made the whole experience even smoother. Overall, a great value for money and a comfortable place to stay.",
      },
      {
        id: 2,
        userName: "Jon",
        userLocation: "Boston, Massachusetts",
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jon",
        yearsOnAirbnb: null,
        date: "June 2025",
        rating: 5,
        comment:
          "Great stay. The place is very spacious and great for 2 people. Washer/dryer unit was nice to have. The place is walking distance to the subway and trains. Also close enough to Hongdae to be able to enjoy the area, but far enough away that you don't feel overwhelmed by tourists or hustle and bustle of that area.",
      },
      {
        id: 3,
        userName: "Sue",
        userLocation: "Bogotá, Colombia",
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sue",
        yearsOnAirbnb: null,
        date: "June 2025",
        rating: 5,
        comment:
          "This was a great place to stay, walkable to many places and near Hongik Station. There's lots of things to do nearby and it's easy to get to many areas of the city quickly. The room was comfortable, quiet and everything worked as expected. Harry & Yon gave us recommendations of nearby places that were very useful. I'd stay here again.",
      },
    ],
  },

  availability: {
    bookedDates: [
      {
        checkIn: "2025-10-06",
        checkOut: "2025-10-06",
      },
      {
        checkIn: "2025-10-13",
        checkOut: "2025-10-13",
      },
      {
        checkIn: "2025-10-18",
        checkOut: "2025-10-18",
      },
      {
        checkIn: "2025-10-23",
        checkOut: "2025-10-23",
      },
      {
        checkIn: "2025-10-29",
        checkOut: "2025-10-29",
      },
      {
        checkIn: "2025-11-02",
        checkOut: "2025-11-02",
      },
      {
        checkIn: "2025-11-09",
        checkOut: "2025-11-09",
      },
      {
        checkIn: "2025-11-12",
        checkOut: "2025-11-12",
      },
      {
        checkIn: "2025-11-21",
        checkOut: "2025-11-21",
      },
      {
        checkIn: "2025-11-23",
        checkOut: "2025-11-23",
      },
      {
        checkIn: "2025-11-30",
        checkOut: "2025-11-30",
      },
      {
        checkIn: "2025-12-05",
        checkOut: "2025-12-05",
      },
    ],
    minStay: 2,
    maxStay: 28,
  },
  capacity: {
    maxGuests: 16,
    maxInfants: 5,
    maxPets: 5,
  },
  unavailableDates: [
    "2025-10-06",
    "2025-10-13",
    "2025-10-18",
    "2025-10-23",
    "2025-10-29",
    "2025-11-02",
    "2025-11-09",
    "2025-11-12",
    "2025-11-21",
    "2025-11-23",
    "2025-11-30",
    "2025-12-05",
  ],
};

const property = {
  title: "Cozy Studio in Montmartre",
  subTitle: "Entire rental unit in Paris, France",
  cardTitle: "Room in Montmartre",
  monthlyBill: 1615,
  squareFeet: 520,
  cardImage:
    "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=800&fit=crop",
  address: "32 Rue Lepic, Paris, France",
  host: {
    name: "Juliette",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juliette",
    isSuperhost: true,
    yearsHosting: 3,
    reviewCount: 210,
    rating: 4.97,
    responseRate: 99,
    responseTime: "within an hour",
    location: "Paris, France",
    bio: "Montmartre artist and Paris local, I love sharing insider tips for the neighborhood.",
  },
  badges: [
    {
      icon: "award",
      title: "Top 5% of homes",
      description:
        "This home is highly ranked based on ratings, reviews, and reliability.",
    },
    {
      icon: "key",
      title: "Exceptional check-in experience",
      description: "Recent guests gave the check-in process a 5-star rating.",
    },
    {
      icon: "location",
      title: "Unbeatable location",
      description:
        "100% of guests in the past year gave this location a 5-star rating.",
    },
  ],
  location: {
    address: "Montmartre",
    city: "Paris",
    state: "",
    country: "France",
    postalCode: "75018",
    coordinates: {
      type: "Point",
      coordinates: [2.334, 48.8867],
    },
  },
  aboutSpace: {
    briefDescription: [
      "Steps from Sacré-Cœur and Moulin Rouge.",
      "Bright, quiet studio with Parisian charm and modern amenities.",
    ],
    fullDescription:
      "Live in bohemian Montmartre! Enjoy a bright, quiet studio with queen bed, full kitchen, and workspace. Surrounded by art and history, perfect for explorers and couples.",
    spaceDetails: {
      floor: "2nd floor with elevator",
      bed: "Queen bed (160 x 200)",
      kitchen: "Separate, full kitchen",
      workspace: "Dedicated desk area with fast WiFi",
    },
    guestAccess: {
      description:
        "5 min to Metro Abbesses (Line 12) and Blanche (Line 2). 10 min to Gare Saint-Lazare.",
      nearbyStations: [
        { line: "Line 12 Abbesses", walkTime: "5 min walk" },
        { line: "Line 2 Blanche", walkTime: "7 min walk" },
      ],
      byCar: "Street parking available nearby",
    },
    otherNotes:
      "Mobility lease only; ideal for training, travel, or professional mobility.",
    registrationDetails:
      "Available with a mobility lease only ('bail mobilité')",
  },
  sleepingArrangementsData: [
    {
      id: 1,
      title: "Bedroom",
      description: "1 queen bed",
      image:
        "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800&h=800&fit=crop",
    },
    {
      id: 2,
      title: "Living room",
      description: "1 couch",
      image:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&h=800&fit=crop",
    },
  ],
  photoCategories: [
    {
      label: "Shared living room",
      key: "livingroom",
      photos: [
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1505691723518-41cb85ee7e47?w=800&h=800&fit=crop",
      ],
    },
    {
      label: "Shared full kitchen",
      key: "kitchen",
      photos: [
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&h=800&fit=crop",
      ],
    },
    {
      label: "Bedroom",
      key: "bedroom",
      photos: [
        "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800&h=800&fit=crop",
      ],
      description: "Single bed",
    },
    {
      label: "Shared full bathroom",
      key: "bathroom",
      photos: [
        "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=800&fit=crop",
      ],
    },
    {
      label: "Shared exterior",
      key: "exterior",
      photos: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&h=800&fit=crop",
      ],
    },
    {
      label: "Additional photos",
      key: "additional",
      photos: [
        "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&h=800&fit=crop",
      ],
    },
  ],
  accommodationType: "1 queen bed • Shared bathroom",
  reviews: 210,
  ratings: 4.97,
  description:
    "An elegant Montmartre getaway with Parisian character and top amenities.",
  checkIn: "14:00",
  checkOut: "11:00",
  price: 120,
  extraInfo: "No smoking. No parties. Quiet hours after 10pm.",
  amenitiesData: {
    featured: [
      { id: 1, name: "Kitchen", icon: "UtensilsCrossed" },
      { id: 2, name: "Wifi", icon: "Wifi" },
      { id: 3, name: "Dedicated workspace", icon: "Laptop" },
      { id: 4, name: "Pets allowed", icon: "PawPrint" },
      { id: 5, name: "HDTV with Netflix, Chromecast", icon: "Tv" },
      { id: 6, name: "Refrigerator", icon: "Refrigerator" },
      { id: 7, name: "Microwave", icon: "Microwave" },
      { id: 8, name: "Long term stays allowed", icon: "Calendar" },
      { id: 9, name: "Paid street parking", icon: "Car" },
      {
        id: 10,
        name: "Carbon monoxide alarm",
        icon: "AlertCircle",
        unavailable: true,
      },
    ],
    categories: [
      {
        title: "Bathroom",
        items: [
          { name: "Cleaning products", icon: "Sparkles" },
          { name: "Shampoo", icon: "ShowerHead" },
          { name: "Body soap", icon: "Waves" },
          { name: "Hot water", icon: "Thermometer" },
          { name: "Shower gel", icon: "ShowerHead" },
        ],
      },
      {
        title: "Bedroom and laundry",
        items: [
          {
            name: "Essentials",
            icon: "Bed",
            description: "Towels, bed sheets, soap, and toilet paper",
          },
          { name: "Hangers", icon: "Shirt" },
          { name: "Bed linens", icon: "Bed", description: "Cotton linens" },
          { name: "Extra pillows and blankets", icon: "Bed" },
          { name: "Room-darkening shades", icon: "Wind" },
          { name: "Clothing storage: walk-in closet", icon: "Shirt" },
        ],
      },
      {
        title: "Entertainment",
        items: [
          { name: "Ethernet connection", icon: "Wifi" },
          { name: "HDTV with Netflix, Chromecast", icon: "Tv" },
          { name: "Books and reading material", icon: "Book" },
        ],
      },
      {
        title: "Heating and cooling",
        items: [{ name: "Radiant heating", icon: "Thermometer" }],
      },
      {
        title: "Home safety",
        items: [
          { name: "Smoke alarm", icon: "AlertCircle" },
          { name: "First aid kit", icon: "Shield" },
        ],
      },
      {
        title: "Internet and office",
        items: [
          { name: "Wifi", icon: "Wifi" },
          {
            name: "Dedicated workspace",
            icon: "Laptop",
            description: "Desk with monitor",
          },
        ],
      },
      {
        title: "Kitchen and dining",
        items: [
          {
            name: "Kitchen",
            icon: "UtensilsCrossed",
            description: "Guests can cook their own meals",
          },
          { name: "Refrigerator", icon: "Refrigerator" },
          { name: "Microwave", icon: "Microwave" },
          {
            name: "Cooking basics",
            icon: "UtensilsCrossed",
            description: "Pots and pans, oil, salt, pepper",
          },
          {
            name: "Dishes and silverware",
            icon: "UtensilsCrossed",
            description: "Bowls, chopsticks, plates, cups",
          },
          { name: "Freezer", icon: "Refrigerator" },
          { name: "Hot water kettle", icon: "Coffee" },
          { name: "Wine glasses", icon: "UtensilsCrossed" },
          { name: "Baking sheet", icon: "UtensilsCrossed" },
          { name: "Coffee", icon: "Coffee" },
        ],
      },
      {
        title: "Location features",
        items: [{ name: "Laundromat nearby", icon: "MapPin" }],
      },
      {
        title: "Parking and facilities",
        items: [{ name: "Paid street parking off premises", icon: "Car" }],
      },
      {
        title: "Services",
        items: [
          {
            name: "Pets allowed",
            icon: "PawPrint",
            description: "Assistance animals are always allowed",
          },
          {
            name: "Long term stays allowed",
            icon: "Calendar",
            description: "Allow stay for 28 days or more",
          },
          { name: "Cleaning available during stay", icon: "Sparkles" },
          { name: "Host greets you", icon: "User" },
        ],
      },
      {
        title: "Not included",
        items: [
          {
            name: "Exterior security cameras on property",
            icon: "Shield",
            unavailable: true,
          },
          { name: "Washer", icon: "WashingMachine", unavailable: true },
          { name: "Dryer", icon: "Wind", unavailable: true },
          { name: "Air conditioning", icon: "CloudOff", unavailable: true },
          {
            name: "Carbon monoxide alarm",
            icon: "AlertCircle",
            unavailable: true,
            note: "This place may not have a carbon monoxide detector. Reach out to the host with any questions.",
          },
        ],
      },
    ],
  },
  reviewsData: {
    overallRating: 4.97,
    totalReviews: 210,
    isGuestFavorite: true,
    topPercentage: 5,
    ratings: [
      { stars: 5, count: 180 },
      { stars: 4, count: 26 },
      { stars: 3, count: 3 },
      { stars: 2, count: 1 },
      { stars: 1, count: 0 },
    ],
    categories: [
      { name: "Cleanliness", score: 5.0, icon: "Sparkles" },
      { name: "Accuracy", score: 5.0, icon: "CheckCircle" },
      { name: "Check-in", score: 5.0, icon: "KeyRound" },
      { name: "Communication", score: 5.0, icon: "MessageSquare" },
      { name: "Location", score: 5.0, icon: "MapPin" },
      { name: "Value", score: 4.9, icon: "Tag" },
    ],
    reviews: [
      {
        id: 1,
        userName: "Camille",
        userLocation: "Lyon, France",
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Camille",
        yearsOnAirbnb: 6,
        date: "August 2025",
        rating: 5,
        comment:
          "Loved the artistic vibe and perfect location. The host was super helpful and friendly!",
      },
      {
        id: 2,
        userName: "David",
        userLocation: "London, UK",
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
        yearsOnAirbnb: 3,
        date: "July 2025",
        rating: 5,
        comment:
          "Everything was clean and the check-in was easy. Highly recommend for Montmartre visits.",
      },
      {
        id: 3,
        userName: "Sofia",
        userLocation: "Madrid, Spain",
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
        yearsOnAirbnb: 2,
        date: "June 2025",
        rating: 5,
        comment:
          "Peaceful and stylish studio, loved the nearby restaurants and cafés.",
      },
      {
        id: 4,
        userName: "Marek",
        userLocation: "Prague, Czech Republic",
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marek",
        yearsOnAirbnb: 4,
        date: "May 2025",
        rating: 5,
        comment:
          "Perfect for remote work and exploring Paris. Fast WiFi and a great workspace.",
      },
    ],
  },
  availability: {
    bookedDates: [
      { checkIn: "2025-10-06", checkOut: "2025-10-09" },
      { checkIn: "2025-10-13", checkOut: "2025-10-16" },
      { checkIn: "2025-10-18", checkOut: "2025-10-21" },
      { checkIn: "2025-10-23", checkOut: "2025-10-26" },
      { checkIn: "2025-10-29", checkOut: "2025-11-01" },
      { checkIn: "2025-11-02", checkOut: "2025-11-05" },
      { checkIn: "2025-11-09", checkOut: "2025-11-12" },
      { checkIn: "2025-11-12", checkOut: "2025-11-15" },
      { checkIn: "2025-11-21", checkOut: "2025-11-24" },
      { checkIn: "2025-11-23", checkOut: "2025-11-26" },
      { checkIn: "2025-11-30", checkOut: "2025-12-03" },
      { checkIn: "2025-12-05", checkOut: "2025-12-08" },
    ],
    minStay: 2,
    maxStay: 28,
  },
  capacity: {
    maxGuests: 16,
    maxInfants: 5,
    maxPets: 5,
  },
  unavailableDates: [
    "2025-10-06",
    "2025-10-13",
    "2025-10-18",
    "2025-10-23",
    "2025-10-29",
    "2025-11-02",
    "2025-11-09",
    "2025-11-12",
    "2025-11-21",
    "2025-11-23",
    "2025-11-30",
    "2025-12-05",
  ],
};
