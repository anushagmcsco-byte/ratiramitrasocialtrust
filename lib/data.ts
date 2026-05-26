export interface FocusArea {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  icon: string;
  color: string;
  bannerSeed: string;
  bullets: string[];
  impactFocus: string;
  targetGoal: number;
  raisedAmount: number;
  description: string;
  projects: { name: string; description: string; status: 'active' | 'completed' }[];
}

export const LEGAL_COMPLIANCE = {
  type: "Public Charitable Trust",
  registeredUnder: "Indian Trusts Act, 1882",
  registrationNo: "HBL-4-00006-2021-22",
  ngoDarpanId: "KA/2023/0342549",
  pan: "AAETR3286K",
  csrNo: "CSR00059487",
  approval80G: "Valid AY 2024-25 to 2026-27 (Section 80G Provisional)",
  operationalArea: "Karnataka (multiple districts including Dharwad, Belagavi, Haveri, Raichur, Koppal, and more)",
  establishmentYear: 2021,
  headquarters: "Hubballi, Karnataka"
};

export const CONTACT_INFO = {
  address: "#37, First Floor, Pride Icon, Gokul Road, Hubballi – 580030",
  phone: "+91 7676376221",
  email: "raitamitrasocialtrust@gmail.com",
};

export const FOCUS_AREAS: FocusArea[] = [
  {
    id: "sustainable-agriculture",
    number: 1,
    title: "Sustainable Agriculture & Farmer Empowerment",
    shortTitle: "Agriculture & Farmers",
    icon: "Sprout",
    color: "from-emerald-500 to-green-600",
    bannerSeed: "fields",
    description: "Uplifting small and marginal farmers by propagating climate-resilient farming, conserving soil health, and improving water efficiency.",
    bullets: [
      "Climate-resilient and sustainable farming practices",
      "Soil health, water conservation, and productivity improvement",
      "Farmer training, awareness, and capacity building",
      "Income diversification and agri-based livelihoods",
      "Support for small and marginal farmers"
    ],
    impactFocus: "Increasing farmer income, reducing risk, and ensuring long-term sustainability",
    targetGoal: 500000,
    raisedAmount: 340000,
    projects: [
      { name: "Siri Dharwad Seed Bank", description: "Providing high-yielding, climate-resistant seeds of local millets and pulses to 500+ marginal families in Dharwad.", status: "active" },
      { name: "Bhumi Mitra Soil Wellness Campaign", description: "Free soil testing kit distributions and organic fertilizer tutorials in Hubballi rural sector.", status: "active" },
      { name: "Amrit Jal Micro-Irrigation Pilot", description: "Implementing grid-based drip irrigation and farm pond setups in dry zones of Koppal.", status: "completed" }
    ]
  },
  {
    id: "women-empowerment",
    number: 2,
    title: "Women Empowerment & Livelihoods",
    shortTitle: "Women Empowerment",
    icon: "Users",
    color: "from-amber-500 to-orange-600",
    bannerSeed: "weaving",
    description: "Fostering economic independence and decision-making power through self-help groups (SHGs), micro-enterprise incubation, and digital training.",
    bullets: [
      "Skill development and entrepreneurship training for women",
      "Formation and strengthening of Self-Help Groups (SHGs)",
      "Financial literacy and access to income opportunities",
      "Digital and AI literacy for women in rural areas",
      "Leadership development and social empowerment"
    ],
    impactFocus: "Financial independence, decision-making power, and gender equality",
    targetGoal: 300000,
    raisedAmount: 180000,
    projects: [
      { name: "Shakti Tailoring & Business Collective", description: "Providing vocational sewing courses and equipment packets to help village women establish micro-tailoring shops.", status: "active" },
      { name: "Gram Unnati Financial Literacy Circles", description: "Educating over 1,200 women on digital savings tools, microloans, and cooperative accounting.", status: "active" },
      { name: "Rural Digital & AI Workshop", description: "Mobile-based digital literacy enabling women to use digital payment services and marketplace apps safely.", status: "completed" }
    ]
  },
  {
    id: "digital-skills",
    number: 3,
    title: "Education, Digital & AI Skill Development",
    shortTitle: "Digital & AI Education",
    icon: "Cpu",
    color: "from-blue-500 to-indigo-600",
    bannerSeed: "coding",
    description: "Bridging the rural-urban technology divide by training village youth in AI applications, computer literacy, and modern workplace skills.",
    bullets: [
      "AI, digital literacy, and emerging technology training",
      "Skill development for rural youth and students",
      "Career readiness and employability programs",
      "School and community-based learning initiatives",
      "Innovation and entrepreneurship development"
    ],
    impactFocus: "Future-ready youth with employable and entrepreneurial skills",
    targetGoal: 400000,
    raisedAmount: 210000,
    projects: [
      { name: "Mitra TechLab Hubballi", description: "A free physical learning lab offering hands-on coding, computer basics, and AI tool orientations.", status: "active" },
      { name: "School Tech Integration Program", description: "Teaming up with government high schools to establish smart classrooms and digital science experiments.", status: "active" },
      { name: "Rural Career Readiness Bootcamp", description: "Resume building, presentation abilities, and technical readiness programs for graduating rural youth.", status: "completed" }
    ]
  },
  {
    id: "health-wellbeing",
    number: 4,
    title: "Health, Nutrition & Community Well-being",
    shortTitle: "Health & Well-being",
    icon: "Heart",
    color: "from-rose-500 to-red-600",
    bannerSeed: "health",
    description: "Caring for rural health through preventive health camps, clean drinking water options, maternal outreach, and nutrition awareness.",
    bullets: [
      "Preventive healthcare awareness programs",
      "Nutrition, hygiene, and sanitation education",
      "Rural health camps and outreach initiatives",
      "Focus on maternal and child health"
    ],
    impactFocus: "Healthier communities with improved quality of life",
    targetGoal: 250000,
    raisedAmount: 155000,
    projects: [
      { name: "Sanjeevini Rural Wellness Camps", description: "Monthly mobile clinics bringing specialized pediatricians and general physicians to remote drylands.", status: "active" },
      { name: "Mata-Shishu Poshan Drive", description: "Supplying pregnant women and infant mothers with healthy superfoods and clinical supplements.", status: "active" },
      { name: "Clean Water Grid", description: "Installing low-maintenance community biosand filtration plants to ensure fluoride-free drinking water.", status: "completed" }
    ]
  },
  {
    id: "climate-action",
    number: 5,
    title: "Environment & Climate Action",
    shortTitle: "Climate Action",
    icon: "Leaf",
    color: "from-teal-500 to-emerald-600",
    bannerSeed: "forest",
    description: "Combatting climate change with local watershed harvesting, community afforestation, and green energy practices for villagers.",
    bullets: [
      "Natural resource conservation and sustainable practices",
      "Water management and soil conservation programs",
      "Climate change awareness and adaptation strategies",
      "Promotion of eco-friendly livelihoods"
    ],
    impactFocus: "Climate-resilient communities and sustainable ecosystems",
    targetGoal: 200000,
    raisedAmount: 95000,
    projects: [
      { name: "Koppal Micro-Water Buffers", description: "Traditional check dam restorations to raise the groundwater levels in high drought zones.", status: "active" },
      { name: "Gram Shobha Sapling Mission", description: "Community planting of over 5,000 multi-purpose native trees around dry field borders.", status: "active" },
      { name: "EcoLivelihood bio-gas Pilot", description: "Assisting family dairy owners to install domestic bio-gas generators to replace firewood.", status: "completed" }
    ]
  },
  {
    id: "rural-entrepreneurship",
    number: 6,
    title: "Livelihoods & Rural Entrepreneurship",
    shortTitle: "Rural Livelihoods",
    icon: "Briefcase",
    color: "from-cyan-500 to-teal-600",
    bannerSeed: "craft",
    description: "Fueling village startups, local organic enterprise cooperatives, and craft clusters to generate sustainable livelihoods locally.",
    bullets: [
      "Support for small and marginal farmers",
      "Support for micro-enterprises and rural startups",
      "Financial literacy and market linkages",
      "Promotion of local crafts and businesses"
    ],
    impactFocus: "Sustainable income generation and rural economic growth",
    targetGoal: 350000,
    raisedAmount: 245000,
    projects: [
      { name: "Raita-Mitra Agro Marketing Coop", description: "Providing a direct supply-line from Hubballi organic farms directly to urban buyers, eliminating middleman.", status: "active" },
      { name: "Gramya Crafts E-Store Initiative", description: "Onboarding rural grass mat weavers and pottery designers onto online handicraft portals.", status: "active" },
      { name: "Micro-Enterprise Incubation Fund", description: "Interest-free seed grants of ₹15,000 each for small town food carts and cycle mechanics.", status: "completed" }
    ]
  }
];

export const GALLERY_ITEMS = [
  {
    id: "g1",
    title: "Siri Dharwad Seed Distribution",
    category: "sustainable-agriculture",
    image: "https://picsum.photos/seed/agriculture-g1/800/600",
    description: "Distributing native, climate-resilient millet seeds directly to dryland farmers in Dharwad.",
    date: "March 2026"
  },
  {
    id: "g2",
    title: "Shakti Weaving & Tailoring Collective",
    category: "women-empowerment",
    image: "https://picsum.photos/seed/women-g2/800/600",
    description: "Our active vocational batch practicing sewing and garment design for setting up micro-entities.",
    date: "April 2026"
  },
  {
    id: "g3",
    title: "AI Literacy & TechLab Inauguration",
    category: "digital-skills",
    image: "https://picsum.photos/seed/tech-g3/800/600",
    description: "Excited rural high school youth working with computers during the initial Mitra lab session in Hubballi.",
    date: "January 2026"
  },
  {
    id: "g4",
    title: "Sanjeevini Mobile Health Camp",
    category: "health-wellbeing",
    image: "https://picsum.photos/seed/health-g4/800/600",
    description: "Free medical examinations and diagnostics offered near rural Koppal, focusing on maternal health.",
    date: "May 2026"
  },
  {
    id: "g5",
    title: "Gram Shobha Sapling Drive",
    category: "climate-action",
    image: "https://picsum.photos/seed/environment-g5/800/600",
    description: "Volunteer-backed planting of indigenous fruit-bearing trees along village water channels.",
    date: "February 2026"
  },
  {
    id: "g6",
    title: "Organic Harvest Market Union",
    category: "rural-entrepreneurship",
    image: "https://picsum.photos/seed/livelihoods-g6/800/600",
    description: "Farmers grading cold-pressed groundnut oils and organic grains for shipment straight to market.",
    date: "April 2026"
  }
];

export const FAQS = [
  {
    question: "Is Raita Mitra Social Trust registered and tax-exempt?",
    answer: "Yes, Raita Mitra Social Trust (R) is fully registered under the Indian Trusts Act, 1882 (No. HBL-4-00006-2021-22). We are on the NGO Darpan Portal (KA/2023/0342549), registered for CSR (CSR00059487) with the MCA, and hold valid provisional approval under Section 80G for tax exemption."
  },
  {
    question: "How are my donation funds utilized?",
    answer: "We ensure extreme trace-integrity. About 90% of all crowdsourced campaign donations go directly into funding physical assets (seeds, micro-irrigation gear, sewing kits, computer hardware, testing kits). The remaining 10% supports localized operation costs and grassroots camp logistics."
  },
  {
    question: "Do I receive a tax exemption certificate?",
    answer: "Absolutely! Since we are approved under Section 80G, donations made on our portal qualify for a 50% income tax deduction under Indian tax codes. When your simulated donation is settled, our system generates an interactive 80G certificate with your name, phone, email, and PAN details for instant simulation."
  },
  {
    question: "Where are your major operational districts?",
    answer: "Our operations are focused heavily across Karnataka, explicitly targeting high-resource gaps or dry regions, including Dharwad, Belagavi, Haveri, Raichur, Koppal, and adjacent towns."
  }
];
