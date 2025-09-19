import React, { useState, useEffect, useRef } from "react";

// --- MOCK DATA ---
const baseData = {
  kpi: {
    avgCustomerSpend: 750,
    hottestCuisine: "North Indian",
    topOpportunityArea: "Sector 29",
    monthlySearches: 125000,
    grossRevenue: 1245000,
    netProfitMargin: 18.5,
  },
  marketOpportunity: [
    {
      location: "Cyber Hub",
      demandScore: 95,
      supplyScore: 90,
      opportunity: "Saturated",
      avgIncome: "High",
      dominantAge: "25-35",
    },
    {
      location: "Sector 29",
      demandScore: 92,
      supplyScore: 65,
      opportunity: "High",
      avgIncome: "High",
      dominantAge: "22-30",
    },
    {
      location: "Galleria Market",
      demandScore: 80,
      supplyScore: 75,
      opportunity: "Moderate",
      avgIncome: "Very High",
      dominantAge: "30-45",
    },
    {
      location: "32nd Avenue",
      demandScore: 85,
      supplyScore: 60,
      opportunity: "High",
      avgIncome: "Very High",
      dominantAge: "28-40",
    },
    {
      location: "Golf Course Road",
      demandScore: 88,
      supplyScore: 85,
      opportunity: "Saturated",
      avgIncome: "Very High",
      dominantAge: "35-50",
    },
    {
      location: "Sohna Road",
      demandScore: 75,
      supplyScore: 40,
      opportunity: "Very High",
      avgIncome: "Mid",
      dominantAge: "Families",
    },
  ],
  topDishes: [
    {
      name: "Butter Chicken",
      cuisine: "North Indian",
      monthlyOrders: 4200,
      avgPrice: 650,
      profitMargin: 40,
      image: "https://placehold.co/100x100/f59e0b/ffffff?text=Butter+Chicken",
    },
    {
      name: "Hyderabadi Biryani",
      cuisine: "Mughlai",
      monthlyOrders: 3800,
      avgPrice: 850,
      profitMargin: 35,
      image: "https://placehold.co/100x100/f59e0b/ffffff?text=Biryani",
    },
    {
      name: "Paneer Tikka",
      cuisine: "North Indian",
      monthlyOrders: 3500,
      avgPrice: 450,
      profitMargin: 50,
      image: "https://placehold.co/100x100/f59e0b/ffffff?text=Paneer+Tikka",
    },
    {
      name: "Masala Dosa",
      cuisine: "South Indian",
      monthlyOrders: 3200,
      avgPrice: 300,
      profitMargin: 55,
      image: "https://placehold.co/100x100/f59e0b/ffffff?text=Dosa",
    },
    {
      name: "Chole Bhature",
      cuisine: "Punjabi",
      monthlyOrders: 2800,
      avgPrice: 350,
      profitMargin: 60,
      image: "https://placehold.co/100x100/f59e0b/ffffff?text=Chole+Bhature",
    },
  ],
  cuisineAnalytics: [
    {
      name: "North Indian",
      popularity: 40,
      competition: 92,
      avgSpend: 700,
      searchesLast30Days: 85000,
    },
    {
      name: "South Indian",
      popularity: 20,
      competition: 70,
      avgSpend: 450,
      searchesLast30Days: 45000,
    },
    {
      name: "Chinese",
      popularity: 15,
      competition: 90,
      avgSpend: 800,
      searchesLast30Days: 32000,
    },
    {
      name: "Mughlai",
      popularity: 15,
      competition: 80,
      avgSpend: 950,
      searchesLast30Days: 38000,
    },
    {
      name: "Italian",
      popularity: 10,
      competition: 85,
      avgSpend: 1100,
      searchesLast30Days: 15000,
    },
  ],
  profitability: {
    revenue: [
      { name: "Jan", value: 1080000 },
      { name: "Feb", value: 1150000 },
      { name: "Mar", value: 1245000 },
    ],
    expenses: [
      { name: "Jan", value: 880000 },
      { name: "Feb", value: 950000 },
      { name: "Mar", value: 1015000 },
    ],
    costBreakdown: [
      { name: "Raw Materials", value: 50 },
      { name: "Staff Salary", value: 20 },
      { name: "Rent & Utilities", value: 20 },
      { name: "Marketing", value: 5 },
      { name: "Other", value: 5 },
    ],
  },
};

const recipeData = [
  {
    id: 1,
    name: "Deconstructed Samosa Chaat",
    description:
      "A modern, plated twist on the classic street food, separating components for texture and presentation.",
    image: "https://placehold.co/600x400/f59e0b/ffffff?text=Samosa+Chaat",
    difficulty: "Medium",
    prepTime: "45 mins",
    ingredients: [
      "Samosa Pastry Sheets",
      "Spiced Potato Filling",
      "Yogurt",
      "Tamarind Chutney",
      "Mint Chutney",
    ],
    category: "Appetizer",
  },
  {
    id: 2,
    name: "Jackfruit 'Biryani'",
    description:
      "A savory and aromatic biryani using tender young jackfruit as a meat substitute, appealing to vegetarian and vegan diners.",
    image: "https://placehold.co/600x400/84cc16/ffffff?text=Jackfruit+Biryani",
    difficulty: "Medium",
    prepTime: "1 hr 15 mins",
    ingredients: [
      "Raw Jackfruit",
      "Basmati Rice",
      "Biryani Masala",
      "Fried Onions",
      "Saffron",
    ],
    category: "Main Course",
  },
  {
    id: 3,
    name: "Avocado & Corn Bhel",
    description:
      "A healthy and trendy fusion bhel that combines creamy avocado and sweet corn with traditional puffed rice and chutneys.",
    image: "https://placehold.co/600x400/22c55e/ffffff?text=Avocado+Bhel",
    difficulty: "Easy",
    prepTime: "20 mins",
    ingredients: [
      "Puffed Rice (Murmura)",
      "Avocado",
      "Sweet Corn",
      "Onion",
      "Sev",
      "Bhel Chutneys",
    ],
    category: "Appetizer",
  },
  {
    id: 4,
    name: "Gulab Jamun Cheesecake",
    description:
      "An indulgent fusion dessert featuring a creamy cheesecake base with soft, syrup-soaked gulab jamuns baked within.",
    image: "https://placehold.co/600x400/ec4899/ffffff?text=Fusion+Cheesecake",
    difficulty: "Hard",
    prepTime: "4 hours",
    ingredients: [
      "Cream Cheese",
      "Gulab Jamun",
      "Biscuit Base",
      "Cardamom",
      "Pistachios",
    ],
    category: "Dessert",
  },
  {
    id: 5,
    name: "Paneer Ghee Roast Bombs",
    description:
      "Spicy and tangy Mangalorean-style paneer ghee roast stuffed inside a crispy shell, served as a flavor-packed appetizer.",
    image: "https://placehold.co/600x400/ef4444/ffffff?text=Paneer+Bombs",
    difficulty: "Medium",
    prepTime: "50 mins",
    ingredients: [
      "Paneer",
      "Ghee",
      "Byadgi Chillies",
      "Tamarind",
      "Curry Leaves",
    ],
    category: "Appetizer",
  },
  {
    id: 6,
    name: "Millet Khichdi Risotto",
    description:
      "A healthy take on a comfort classic, using nutritious millets cooked in a creamy, risotto-style with seasonal vegetables.",
    image: "https://placehold.co/600x400/a855f7/ffffff?text=Millet+Khichdi",
    difficulty: "Easy",
    prepTime: "35 mins",
    ingredients: [
      "Foxtail Millet",
      "Moong Dal",
      "Mixed Vegetables",
      "Turmeric",
      "Ghee",
    ],
    category: "Main Course",
  },
];

// --- DYNAMIC DATA SIMULATION ---
const generateDynamicData = (location) => {
  const multiplier =
    location === "Delhi"
      ? 1.5
      : location === "Mumbai"
      ? 2.2
      : location === "Bengaluru"
      ? 1.8
      : 1;
  const randomFactor = 0.9 + Math.random() * 0.2; // +/- 10% variance
  const dynamicData = JSON.parse(JSON.stringify(baseData)); // Deep copy
  dynamicData.kpi.grossRevenue = Math.round(
    dynamicData.kpi.grossRevenue * multiplier * randomFactor
  );
  dynamicData.kpi.monthlySearches = Math.round(
    dynamicData.kpi.monthlySearches * multiplier * randomFactor
  );
  dynamicData.kpi.netProfitMargin = parseFloat(
    (dynamicData.kpi.netProfitMargin * (0.95 + Math.random() * 0.1)).toFixed(1)
  );
  dynamicData.topDishes.forEach((dish) => {
    dish.monthlyOrders = Math.round(
      dish.monthlyOrders * multiplier * (0.8 + Math.random() * 0.4)
    );
  });
  return dynamicData;
};

// --- ICON COMPONENTS ---
const Sun = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);
const Moon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);
const BookOpen = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);
const LayoutDashboard = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </svg>
);
const PieChart = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
    <path d="M22 12A10 10 0 0 0 12 2v10z" />
  </svg>
);
const ShoppingBag = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);
const Map = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const DollarSign = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="12" x2="12" y1="2" y2="22" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);
const BarChart3 = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 3v18h18" />
    <path d="M18 17V9" />
    <path d="M13 17V5" />
    <path d="M8 17v-3" />
  </svg>
);
const Menu = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);
const Info = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);
const LogOut = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" x2="9" y1="12" y2="12" />
  </svg>
);
const ChevronDown = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

// --- UI COMPONENTS ---
const Card = ({ children, className }) => (
  <div
    className={`bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700 rounded-xl shadow-sm ${className}`}
  >
    {children}
  </div>
);
const CardHeader = ({ children, className }) => (
  <div
    className={`p-6 flex flex-row items-center justify-between space-y-0 pb-2 ${className}`}
  >
    {children}
  </div>
);
const CardTitle = ({ children, className }) => (
  <h3
    className={`text-base font-semibold leading-none tracking-tight text-gray-700 dark:text-gray-300 ${className}`}
  >
    {children}
  </h3>
);
const CardContent = ({ children, className }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const CustomDropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-48" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-white dark:bg-gray-800 py-2 px-3 rounded-lg border border-gray-200/80 dark:border-gray-700 shadow-sm text-sm font-semibold text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        <span>{value}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 animate-in fade-in-20">
          <ul className="py-1">
            {options.map((option) => (
              <li key={option}>
                <button
                  onClick={() => handleSelect(option)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// --- DASHBOARD WIDGETS ---
const KpiCard = ({ title, value, icon, subtext }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
        {value}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtext}</p>
    </CardContent>
  </Card>
);

const getOpportunityColor = (opportunity) => {
  switch (opportunity) {
    case "Very High":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300";
    case "High":
      return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300";
    case "Moderate":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300";
    case "Saturated":
      return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }
};

// --- PAGE COMPONENTS ---
const HomePage = ({ setActivePage, kpiData }) => (
  <div className="h-full">
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200/80 dark:border-gray-700 text-center">
      <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-2">
        Welcome to Your Command Center
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
        This is where data drives decisions. Get a bird's-eye view of your
        restaurant's performance and the market trends shaping your success.
      </p>
    </div>

    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <button
          onClick={() => setActivePage("Market Analysis")}
          className="group text-left p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-200/80 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-500"
        >
          <Map className="w-8 h-8 text-teal-600 mb-3" />
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            Market Hotspots
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Discover high-demand, low-supply areas.
          </p>
        </button>
        <button
          onClick={() => setActivePage("Menu Insights")}
          className="group text-left p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-200/80 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500"
        >
          <ShoppingBag className="w-8 h-8 text-orange-500 mb-3" />
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            Optimize Your Menu
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Analyze top-selling dishes and profitability.
          </p>
        </button>
        <button
          onClick={() => setActivePage("Recipes")}
          className="group text-left p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-200/80 dark:border-gray-700 hover:border-pink-500 dark:hover:border-pink-500"
        >
          <BookOpen className="w-8 h-8 text-pink-500 mb-3" />
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            Recipe Inspiration
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Get creative ideas for your next hit dish.
          </p>
        </button>
        <button
          onClick={() => setActivePage("Profitability")}
          className="group text-left p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-200/80 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500"
        >
          <DollarSign className="w-8 h-8 text-green-500 mb-3" />
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            Review Financials
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Track revenue, expenses, and profitability.
          </p>
        </button>
      </div>
    </div>
    <div className="mt-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200/80 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4 text-center">
        Your At-a-Glance Dashboard
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <div>
          <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">
            {kpiData.topOpportunityArea}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Top Opportunity
          </p>
        </div>
        <div>
          <p className="text-3xl font-bold text-orange-500 dark:text-orange-400">
            {kpiData.hottestCuisine}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Hottest Cuisine
          </p>
        </div>
        <div>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            ₹{kpiData.avgCustomerSpend}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Avg. Customer Spend
          </p>
        </div>
        <div>
          <p className="text-3xl font-bold text-purple-500 dark:text-purple-400">
            {(kpiData.monthlySearches / 1000).toFixed(0)}k
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Monthly Searches
          </p>
        </div>
      </div>
    </div>
  </div>
);

const DashboardPage = ({ data }) => (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <KpiCard
        title="Gross Revenue (30d)"
        value={`₹${(data.kpi.grossRevenue / 100000).toFixed(1)}L`}
        icon={<DollarSign className="text-green-500" />}
        subtext="Last 30 days"
      />
      <KpiCard
        title="Net Profit Margin"
        value={`${data.kpi.netProfitMargin}%`}
        icon={<PieChart className="text-amber-500" />}
        subtext="Last 30 days"
      />
      <KpiCard
        title="Top Opportunity Area"
        value={data.kpi.topOpportunityArea}
        icon={<Map className="text-blue-500" />}
        subtext="High Demand, Low Supply"
      />
      <KpiCard
        title="Monthly Searches"
        value={`${(data.kpi.monthlySearches / 1000).toFixed(1)}k`}
        icon={<BarChart3 className="text-purple-500" />}
        subtext="For restaurants in selected city"
      />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Market Opportunity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600 dark:text-gray-400">
              <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3">Location</th>
                  <th className="px-6 py-3 text-center">Demand</th>
                  <th className="px-6 py-3 text-center">Supply</th>
                  <th className="px-6 py-3 text-center">Opportunity</th>
                </tr>
              </thead>
              <tbody>
                {data.marketOpportunity.map((item) => (
                  <tr
                    key={item.location}
                    className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <th className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                      {item.location}
                    </th>
                    <td className="px-6 py-4 text-center">
                      <div className="relative pt-1">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-amber-200">
                          <div
                            style={{ width: `${item.demandScore}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-amber-500"
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="relative pt-1">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                          <div
                            style={{ width: `${item.supplyScore}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-2 py-1 font-semibold text-xs rounded-full ${getOpportunityColor(
                          item.opportunity
                        )}`}
                      >
                        {item.opportunity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Top Selling Dishes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {data.topDishes.slice(0, 5).map((dish) => (
              <li
                key={dish.name}
                className="flex items-center text-sm space-x-4"
              >
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-grow">
                  <p className="font-semibold text-gray-800 dark:text-gray-100">
                    {dish.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {dish.cuisine}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-amber-600 dark:text-amber-400">
                    {dish.monthlyOrders.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    orders
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  </>
);

const MarketAnalysisPage = ({ data }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Live Demand Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <img
              src="https://placehold.co/800x600/e2e8f0/4a5568?text=Map+of+City"
              alt="Map of City"
              className="w-full h-auto object-cover rounded-xl"
            />
            <div className="absolute top-[25%] left-[30%] text-center">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
              <span className="text-xs font-bold text-red-700 bg-white/80 px-1 rounded">
                Hotspot 1
              </span>
            </div>
            <div className="absolute top-[45%] left-[50%] text-center">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
              <span className="text-xs font-bold text-green-700 bg-white/80 px-1 rounded">
                Opportunity 1
              </span>
            </div>
            <div className="absolute top-[60%] left-[20%] text-center">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
              <span className="text-xs font-bold text-green-700 bg-white/80 px-1 rounded">
                Opportunity 2
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Detailed Market Opportunity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600 dark:text-gray-400">
              <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3">Location</th>
                  <th className="px-6 py-3">Opportunity</th>
                  <th className="px-6 py-3">Dominant Age Group</th>
                  <th className="px-6 py-3">Avg. Income</th>
                </tr>
              </thead>
              <tbody>
                {data.marketOpportunity.map((item) => (
                  <tr
                    key={item.location}
                    className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                      {item.location}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 font-semibold text-xs rounded-full ${getOpportunityColor(
                          item.opportunity
                        )}`}
                      >
                        {item.opportunity}
                      </span>
                    </td>
                    <td className="px-6 py-4">{item.dominantAge}</td>
                    <td className="px-6 py-4">{item.avgIncome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const MenuInsightsPage = ({ data }) => (
  <div className="space-y-8">
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Top Selling Dishes & Profitability
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600 dark:text-gray-400">
            <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3">Dish</th>
                <th className="px-6 py-3">Cuisine</th>
                <th className="px-6 py-3 text-right">Monthly Orders</th>
                <th className="px-6 py-3 text-right">Avg. Price (₹)</th>
                <th className="px-6 py-3 text-right">Profit Margin (%)</th>
              </tr>
            </thead>
            <tbody>
              {data.topDishes.map((dish) => (
                <tr
                  key={dish.name}
                  className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                    {dish.name}
                  </td>
                  <td className="px-6 py-4">{dish.cuisine}</td>
                  <td className="px-6 py-4 text-right font-medium">
                    {dish.monthlyOrders.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">{dish.avgPrice}</td>
                  <td
                    className={`px-6 py-4 text-right font-bold ${
                      dish.profitMargin > 45
                        ? "text-green-600 dark:text-green-400"
                        : "text-amber-600 dark:text-amber-400"
                    }`}
                  >
                    {dish.profitMargin}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
);

const CuisineTrendsPage = ({ data }) => (
  <div className="space-y-8">
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Cuisine Performance Matrix
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.cuisineAnalytics.map((cuisine) => (
            <div key={cuisine.name}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-base font-medium text-gray-700 dark:text-gray-300">
                  {cuisine.name}
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Avg. Spend:{" "}
                  <span className="font-bold text-green-600 dark:text-green-400">
                    ₹{cuisine.avgSpend}
                  </span>
                </span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Popularity vs. Competition
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-amber-500 h-2.5 rounded-l-full"
                  style={{ width: `${cuisine.popularity}%` }}
                ></div>
                <div
                  className="bg-red-500 h-2.5 rounded-r-full -mt-2.5 ml-auto"
                  style={{ width: `${100 - cuisine.competition}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4 text-xs text-gray-500 dark:text-gray-400">
          <span>
            <span className="inline-block w-2 h-2 mr-1 bg-amber-500 rounded-full"></span>
            Popularity
          </span>
          <span>
            Competition
            <span className="inline-block w-2 h-2 ml-1 bg-red-500 rounded-full"></span>
          </span>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Cuisine Search Interest (Last 30 Days)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.cuisineAnalytics
            .sort((a, b) => b.searchesLast30Days - a.searchesLast30Days)
            .map((cuisine) => (
              <div key={cuisine.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-base font-medium text-gray-700 dark:text-gray-300">
                    {cuisine.name}
                  </span>
                  <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                    {cuisine.searchesLast30Days.toLocaleString()} Searches
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-amber-500 h-2.5 rounded-full"
                    style={{
                      width: `${(cuisine.searchesLast30Days / 85000) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

const RecipesPage = () => {
  const [filter, setFilter] = useState("All");
  const filteredRecipes =
    filter === "All"
      ? recipeData
      : recipeData.filter((r) => r.category === filter);
  const categories = ["All", ...new Set(recipeData.map((r) => r.category))];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Recipe & Menu Inspiration
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Discover trending and innovative dishes to add to your menu.
        </p>
      </div>
      <div className="flex space-x-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              filter === category
                ? "bg-teal-600 text-white"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRecipes.map((recipe) => (
          <Card
            key={recipe.id}
            className="overflow-hidden transform hover:-translate-y-1 transition-transform duration-300"
          >
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {recipe.name}
                </h3>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    recipe.category === "Appetizer"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                      : recipe.category === "Main Course"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                      : "bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300"
                  }`}
                >
                  {recipe.category}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                <span>
                  Difficulty:{" "}
                  <span className="font-semibold">{recipe.difficulty}</span>
                </span>
                <span>
                  Prep: <span className="font-semibold">{recipe.prepTime}</span>
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {recipe.description}
              </p>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Key Ingredients:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {recipe.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const ProfitabilityPage = ({ data }) => {
  const totalExpenses = data.profitability.expenses.reduce(
    (acc, item) => acc + item.value,
    0
  );
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Quarterly Financials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end space-x-4 p-4">
              {data.profitability.revenue.map((item, index) => (
                <div key={item.name} className="flex-1 text-center">
                  <div className="flex justify-center items-end h-full">
                    <div className="w-1/2 relative">
                      <div
                        className="bg-red-400"
                        style={{
                          height: `${
                            (data.profitability.expenses[index].value /
                              2000000) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <div className="w-1/2 relative">
                      <div
                        className="bg-green-400"
                        style={{ height: `${(item.value / 2000000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400 mt-2 block">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4 text-xs text-gray-500 dark:text-gray-400">
              <span className="mr-4">
                <span className="inline-block w-2 h-2 mr-1 bg-green-400"></span>
                Revenue
              </span>
              <span>
                <span className="inline-block w-2 h-2 mr-1 bg-red-400"></span>
                Expenses
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Cost Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-48 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-amber-200 to-orange-200"></div>
              <div className="absolute w-24 h-24 rounded-full bg-gray-50 dark:bg-gray-800"></div>
              <div className="absolute text-center">
                <span className="font-bold text-2xl text-gray-800 dark:text-gray-100">
                  ₹{(totalExpenses / 100000).toFixed(2)}L
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 block">
                  Total Cost
                </span>
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {data.profitability.costBreakdown.map((item) => (
                <li key={item.name} className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    {item.name}
                  </span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {item.value}%
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const AboutPage = () => (
  <div className="space-y-8">
    <div className="text-center">
      <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">
        About TrendzBI
      </h1>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
        Empowering Restaurants with Data-Driven Decisions.
      </p>
    </div>
    <Card>
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Our Mission
        </h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          In the competitive culinary landscape of India, success is no longer
          just about delicious food. It's about making intelligent, informed
          decisions. At TrendzBI, our mission is to democratize data analytics
          for restaurant owners, from single-location cloud kitchens to
          established multi-chain enterprises. We provide actionable insights on
          market gaps, consumer preferences, and profitability drivers,
          transforming raw data into your most valuable ingredient for growth.
        </p>
      </CardContent>
    </Card>
  </div>
);

// --- AUTHENTICATION & LOADING COMPONENTS ---
const Loader = () => (
  <div className="min-h-screen bg-teal-900 flex flex-col items-center justify-center text-white font-sans">
    <svg
      className="animate-spin h-10 w-10 text-orange-500 mb-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <h1 className="text-3xl font-bold">TrendzBI</h1>
    <p className="mt-2 text-teal-300">Unlocking Culinary Insights...</p>
  </div>
);

const AuthPage = ({ onLogin, setAuthPage, authPage }) => (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans">
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-teal-800">TrendzBI</h1>
        <p className="text-gray-500 mt-2">Insights for the Modern Restaurant</p>
      </div>
      {authPage === "login" ? (
        <LoginPage onLogin={onLogin} setAuthPage={setAuthPage} />
      ) : (
        <SignupPage onLogin={onLogin} setAuthPage={setAuthPage} />
      )}
    </div>
  </div>
);

const LoginPage = ({ onLogin, setAuthPage }) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      onLogin();
    }}
    className="space-y-6"
  >
    <div>
      <label className="text-sm font-bold text-gray-600 block">
        Email Address
      </label>
      <input
        type="email"
        defaultValue="owner@example.com"
        className="w-full p-3 mt-1 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
    </div>
    <div>
      <label className="text-sm font-bold text-gray-600 block">Password</label>
      <input
        type="password"
        defaultValue="password"
        className="w-full p-3 mt-1 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
    </div>
    <button
      type="submit"
      className="w-full py-3 mt-4 font-bold text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors"
    >
      Sign In
    </button>
    <div className="text-center">
      <p className="text-sm">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={() => setAuthPage("signup")}
          className="font-medium text-teal-600 hover:underline"
        >
          Sign Up
        </button>
      </p>
    </div>
  </form>
);

const SignupPage = ({ onLogin, setAuthPage }) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      onLogin();
    }}
    className="space-y-6"
  >
    <div>
      <label className="text-sm font-bold text-gray-600 block">Full Name</label>
      <input
        type="text"
        className="w-full p-3 mt-1 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
    </div>
    <div>
      <label className="text-sm font-bold text-gray-600 block">
        Email Address
      </label>
      <input
        type="email"
        className="w-full p-3 mt-1 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
    </div>
    <div>
      <label className="text-sm font-bold text-gray-600 block">Password</label>
      <input
        type="password"
        className="w-full p-3 mt-1 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
    </div>
    <button
      type="submit"
      className="w-full py-3 mt-4 font-bold text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors"
    >
      Create Account
    </button>
    <div className="text-center">
      <p className="text-sm">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => setAuthPage("login")}
          className="font-medium text-teal-600 hover:underline"
        >
          Sign In
        </button>
      </p>
    </div>
  </form>
);

// --- LAYOUT COMPONENTS ---
const Sidebar = ({ activePage, onPageChange, setSidebarOpen }) => {
  const navItems = [
    { name: "Home", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Dashboard", icon: <BarChart3 className="w-5 h-5" /> },
    { name: "Market Analysis", icon: <Map className="w-5 h-5" /> },
    { name: "Menu Insights", icon: <ShoppingBag className="w-5 h-5" /> },
    { name: "Cuisine Trends", icon: <PieChart className="w-5 h-5" /> },
    { name: "Recipes", icon: <BookOpen className="w-5 h-5" /> },
    { name: "Profitability", icon: <DollarSign className="w-5 h-5" /> },
    { name: "About", icon: <Info className="w-5 h-5" /> },
  ];

  return (
    <aside
      className={`absolute lg:relative w-64 h-screen bg-teal-900 text-gray-200 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
    >
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold text-white">TrendzBI</h1>
        <p className="text-xs text-teal-300">For Restaurants</p>
      </div>
      <nav className="mt-8">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => onPageChange(item.name)}
            className={`w-full flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 hover:bg-teal-800 hover:text-white ${
              activePage === item.name ? "bg-orange-500 text-white" : ""
            }`}
          >
            {item.icon}
            <span className="ml-4">{item.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

const DashboardHeader = ({
  activePage,
  setSidebarOpen,
  theme,
  toggleTheme,
  onLogout,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200/80 dark:border-gray-700 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <button
          onClick={() => setSidebarOpen((o) => !o)}
          className="lg:hidden text-gray-600 dark:text-gray-300 mr-4"
        >
          <Menu />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {activePage}
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </button>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((o) => !o)}
            className="h-10 w-10 rounded-full object-cover ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-800 ring-orange-500"
          >
            <img
              className="h-full w-full rounded-full"
              src="https://placehold.co/100x100/f59e0b/475569?text=Owner"
              alt="user photo"
            />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 py-1 z-50 animate-in fade-in-20">
              <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400">
                Welcome!
              </div>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Settings
              </a>
              <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
              <button
                onClick={onLogout}
                className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const PageLoader = () => (
  <div className="absolute inset-0 bg-gray-100/60 dark:bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50">
    <svg
      className="animate-spin h-8 w-8 text-teal-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  </div>
);

const MainContent = ({
  activePage,
  onPageChange,
  data,
  onFilterChange,
  isPageLoading,
  currentLocation,
  currentDateRange,
}) => {
  const renderPage = () => {
    switch (activePage) {
      case "Home":
        return <HomePage setActivePage={onPageChange} kpiData={data.kpi} />;
      case "Market Analysis":
        return <MarketAnalysisPage data={data} />;
      case "Menu Insights":
        return <MenuInsightsPage data={data} />;
      case "Cuisine Trends":
        return <CuisineTrendsPage data={data} />;
      case "Recipes":
        return <RecipesPage />;
      case "Profitability":
        return <ProfitabilityPage data={data} />;
      case "About":
        return <AboutPage />;
      case "Dashboard":
      default:
        return <DashboardPage data={data} />;
    }
  };
  const locationOptions = ["Gurugram", "Delhi", "Mumbai", "Bengaluru"];
  const dateRangeOptions = ["Last 30 Days", "Last 90 Days", "This Year"];

  return (
    <div className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 sm:p-8 relative">
      {isPageLoading && <PageLoader />}
      {activePage !== "Home" &&
        activePage !== "Recipes" &&
        activePage !== "About" && (
          <div className="flex flex-wrap gap-4 mb-8">
            <CustomDropdown
              options={locationOptions}
              value={currentLocation}
              onChange={(loc) => onFilterChange(loc, null)}
            />
            <CustomDropdown
              options={dateRangeOptions}
              value={currentDateRange}
              onChange={(date) => onFilterChange(null, date)}
            />
          </div>
        )}
      {renderPage()}
    </div>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [theme, setTheme] = useState("dark");
  const [initialLoading, setInitialLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authPage, setAuthPage] = useState("login");
  const [activePage, setActivePage] = useState("Home");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState(baseData);
  const [currentLocation, setCurrentLocation] = useState("Gurugram");
  const [currentDateRange, setCurrentDateRange] = useState("Last 30 Days");

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  const handlePageChange = (newPage) => {
    if (newPage === activePage) return;
    setIsPageLoading(true);
    setTimeout(() => {
      setActivePage(newPage);
      setSidebarOpen(false);
      setIsPageLoading(false);
    }, 500);
  };

  const handleFilterChange = (newLocation, newDateRange) => {
    setIsPageLoading(true);
    const locationToUpdate = newLocation || currentLocation;
    if (newLocation) setCurrentLocation(newLocation);

    const dateRangeToUpdate = newDateRange || currentDateRange;
    if (newDateRange) setCurrentDateRange(newDateRange);

    setTimeout(() => {
      setData(generateDynamicData(locationToUpdate));
      setIsPageLoading(false);
    }, 700);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  if (initialLoading) return <Loader />;

  if (!isLoggedIn)
    return (
      <AuthPage
        onLogin={handleLogin}
        authPage={authPage}
        setAuthPage={setAuthPage}
      />
    );

  return (
    <div
      className={`${theme} flex h-screen bg-gray-100 dark:bg-gray-900 font-sans`}
    >
      <div
        className={`fixed inset-0 z-40 lg:relative lg:translate-x-0 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          activePage={activePage}
          onPageChange={handlePageChange}
          setSidebarOpen={setSidebarOpen}
        />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          activePage={activePage}
          setSidebarOpen={setSidebarOpen}
          theme={theme}
          toggleTheme={toggleTheme}
          onLogout={handleLogout}
        />
        <MainContent
          activePage={activePage}
          onPageChange={handlePageChange}
          data={data}
          onFilterChange={handleFilterChange}
          isPageLoading={isPageLoading}
          currentLocation={currentLocation}
          currentDateRange={currentDateRange}
        />
      </div>
      {isSidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
        ></div>
      )}
    </div>
  );
}
