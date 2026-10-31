// ==========================================
// SCHEMESETU - SCHEME DATA + MATCHING ENGINE
// To add a scheme: copy one object, give it a unique id, and add it to BASE_SCHEMES.
// rules (all optional): minAge, maxAge, gender, maxIncome (annual, ₹), occupations[], state
// ==========================================

const BASE_SCHEMES = [
  {
    id: "pm-kisan", name: "PM Kisan Samman Nidhi", category: "Agriculture", level: "Central", icon: "🌾",
    tags: ["farmer"],
    description: "Income support for eligible farmer families.",
    benefit: "₹6,000 per year, paid in three instalments.",
    eligibility: ["Landholding farmer families", "Subject to government exclusion criteria"],
    documents: ["Aadhaar Card", "Land records", "Bank account details"],
    steps: ["Open the PM-KISAN portal", "Choose 'Farmers Corner' → 'New Farmer Registration'", "Enter Aadhaar, mobile and land details", "Submit and note the registration number"],
    link: "https://pmkisan.gov.in/", rules: { occupations: ["Farmer"] }
  },
  {
    id: "pmfby", name: "PM Fasal Bima Yojana", category: "Agriculture", level: "Central", icon: "🌦️",
    tags: ["farmer"],
    description: "Crop insurance against losses from natural calamities, pests and disease.",
    benefit: "Insurance cover for notified crops at a low farmer premium.",
    eligibility: ["Farmers growing notified crops in notified areas", "Enrol before the cut-off date for the season"],
    documents: ["Aadhaar Card", "Land / tenancy proof", "Bank passbook", "Sowing declaration"],
    steps: ["Visit the PMFBY portal or your bank / CSC", "Select season, state and crop", "Pay the farmer share of premium", "Keep the policy receipt"],
    link: "https://pmfby.gov.in/", rules: { occupations: ["Farmer"] }
  },
  {
    id: "kcc", name: "Kisan Credit Card", category: "Agriculture", level: "Central", icon: "💳",
    tags: ["farmer"],
    description: "Easy short-term credit for farming and allied activities.",
    benefit: "Revolving farm credit at concessional interest through banks.",
    eligibility: ["Farmers, tenant farmers and sharecroppers", "Dairy and fisheries farmers may also qualify"],
    documents: ["Aadhaar Card", "Land records", "Passport photo", "Bank KYC"],
    steps: ["Visit your bank branch or its online portal", "Fill the KCC application", "Submit land and ID documents", "Bank verifies and issues the card"],
    link: "https://www.myscheme.gov.in/", rules: { occupations: ["Farmer"] }
  },
  {
    id: "pmjay", name: "Ayushman Bharat PM-JAY", category: "Health", level: "Central", icon: "🏥",
    tags: ["bpl", "senior"],
    description: "Cashless hospital treatment for eligible families.",
    benefit: "Health cover up to ₹5 lakh per family per year.",
    eligibility: ["Families identified under SECC / scheme criteria", "Check your name on the official beneficiary search"],
    documents: ["Aadhaar Card", "Ration Card", "Mobile number"],
    steps: ["Use 'Am I Eligible' on the PM-JAY portal", "Enter mobile number or ration card", "Visit a CSC or empanelled hospital kiosk", "Get your Ayushman card"],
    link: "https://pmjay.gov.in/", rules: {}
  },
  {
    id: "pmmvy", name: "PM Matru Vandana Yojana", category: "Women & Child", level: "Central", icon: "🤰",
    tags: ["women"],
    description: "Cash support for pregnant and lactating mothers.",
    benefit: "Cash incentive of ₹5,000 in instalments for the first child.",
    eligibility: ["Pregnant / lactating women aged 19+", "Applies to the first living child (see portal for latest rules)"],
    documents: ["Aadhaar Card", "MCP card", "Bank account details"],
    steps: ["Register at your Anganwadi centre or health facility", "Submit the application form with documents", "Claim each instalment after the health checks"],
    link: "https://pmmvy.wcd.gov.in/", rules: { gender: "Female", minAge: 19 }
  },
  {
    id: "nsp", name: "National Scholarship Portal", category: "Education", level: "Central", icon: "🎓",
    tags: ["student", "youth"],
    description: "One portal for many Central and State scholarships.",
    benefit: "Scholarships and fee support depending on the scheme.",
    eligibility: ["Students enrolled in recognised institutions", "Each scholarship has its own marks and income limits"],
    documents: ["Aadhaar Card", "Income certificate", "Marks memo", "Bank details", "Institution ID"],
    steps: ["Register on scholarships.gov.in", "Log in and fill the application", "Upload documents", "Get it verified by your institute"],
    link: "https://scholarships.gov.in/", rules: { occupations: ["Student"] }
  },
  {
    id: "pmay-g", name: "PM Awas Yojana - Gramin", category: "Housing", level: "Central", icon: "🏠",
    tags: ["bpl"],
    description: "Pucca house assistance for eligible rural households.",
    benefit: "Financial assistance for building a house.",
    eligibility: ["Rural households without a pucca house", "Selected from the beneficiary list (SECC / Awaas+)"],
    documents: ["Aadhaar Card", "Job card (if any)", "Bank account", "Address proof"],
    steps: ["Check your name in the beneficiary list", "Contact your Gram Panchayat", "Complete verification", "Receive instalments as construction progresses"],
    link: "https://pmayg.nic.in/", rules: {}
  },
  {
    id: "pmay-u", name: "PM Awas Yojana - Urban", category: "Housing", level: "Central", icon: "🏙️",
    tags: ["bpl"],
    description: "Housing support for urban households including a credit-linked subsidy.",
    benefit: "Assistance or interest subsidy depending on income group.",
    eligibility: ["Urban households without a pucca house", "Income category conditions apply"],
    documents: ["Aadhaar Card", "Income proof", "Address proof", "Bank details"],
    steps: ["Visit the PMAY-Urban portal", "Choose the applicable component", "Fill the online form", "Track application status"],
    link: "https://pmaymis.gov.in/", rules: {}
  },
  {
    id: "sukanya", name: "Sukanya Samriddhi Yojana", category: "Women & Child", level: "Central", icon: "👧",
    tags: ["women"],
    description: "Savings scheme for the future of a girl child.",
    benefit: "Government-backed savings with notified interest.",
    eligibility: ["Girl child below 10 years at account opening", "One account per girl child (limits apply)"],
    documents: ["Girl's birth certificate", "Parent / guardian ID & address proof"],
    steps: ["Visit a post office or authorised bank", "Fill the account opening form", "Submit documents with first deposit", "Receive the passbook"],
    link: "https://www.indiapost.gov.in/", rules: { gender: "Female", maxAge: 10 }
  },
  {
    id: "bbbp", name: "Beti Bachao Beti Padhao", category: "Women & Child", level: "Central", icon: "📚",
    tags: ["women"],
    description: "Campaign to improve child sex ratio and promote girls' education.",
    benefit: "Awareness and support activities for girls' welfare and education.",
    eligibility: ["Focus on girl child welfare and education", "Delivered via district-level programmes"],
    documents: ["Contact your district WCD office for specific requirements"],
    steps: ["Read about the initiative on the official site", "Contact your district Women & Child office", "Link with Sukanya Samriddhi and scholarships"],
    link: "https://www.wcd.nic.in/", rules: { gender: "Female", maxAge: 18 }
  },
  {
    id: "day-nrlm", name: "DAY-NRLM (Self Help Groups)", category: "Women & Child", level: "Central", icon: "👩‍🤝‍👩",
    tags: ["women", "entrepreneur"],
    description: "Livelihood mission helping rural women form self-help groups.",
    benefit: "Training, bank linkage and revolving fund support for SHGs.",
    eligibility: ["Rural women from poor households", "Join through a Self Help Group"],
    documents: ["Aadhaar Card", "Bank account", "Address proof"],
    steps: ["Contact your Village Organisation / Mandal office", "Join or form an SHG", "Open an SHG bank account", "Apply for training and credit linkage"],
    link: "https://aajeevika.gov.in/", rules: { gender: "Female", minAge: 18 }
  },
  {
    id: "mudra", name: "PM Mudra Yojana", category: "Employment", level: "Central", icon: "💼",
    tags: ["entrepreneur", "youth"],
    description: "Collateral-free loans for small non-corporate businesses.",
    benefit: "Loans in Shishu, Kishore and Tarun categories (up to ₹10 lakh; higher tier may apply).",
    eligibility: ["Small manufacturing, trading or service businesses", "Subject to bank / lender assessment"],
    documents: ["Aadhaar Card", "PAN Card", "Business plan / proof", "Bank statements"],
    steps: ["Choose a bank, NBFC or MFI", "Apply with business details", "Complete KYC", "Loan is sanctioned and disbursed"],
    link: "https://www.mudra.org.in/", rules: { occupations: ["Self-employed", "Unemployed"], minAge: 18 }
  },
  {
    id: "stand-up", name: "Stand-Up India", category: "Employment", level: "Central", icon: "🚀",
    tags: ["entrepreneur", "women"],
    description: "Bank loans for SC/ST and women entrepreneurs to start a new enterprise.",
    benefit: "Composite loans between ₹10 lakh and ₹1 crore.",
    eligibility: ["SC/ST and/or women entrepreneurs, 18+", "For a greenfield (first-time) enterprise"],
    documents: ["Aadhaar Card", "PAN Card", "Caste certificate (if SC/ST)", "Project report"],
    steps: ["Register on the Stand-Up Mitra portal", "Prepare your project report", "Apply through the portal or a bank", "Bank processes the loan"],
    link: "https://www.standupmitra.in/", rules: { minAge: 18 }
  },
  {
    id: "pm-svanidhi", name: "PM SVANidhi", category: "Employment", level: "Central", icon: "🛒",
    tags: ["entrepreneur", "worker"],
    description: "Working-capital loans for street vendors.",
    benefit: "Collateral-free loan starting at ₹10,000 with rewards for timely repayment.",
    eligibility: ["Street vendors with a vending certificate / ID", "Surveyed vendors are also eligible"],
    documents: ["Aadhaar Card", "Vending certificate / letter of recommendation", "Bank account"],
    steps: ["Visit the PM SVANidhi portal", "Apply with Aadhaar-linked mobile", "Upload vending proof", "Loan is processed by the lender"],
    link: "https://pmsvanidhi.mohua.gov.in/", rules: { occupations: ["Self-employed", "Worker"] }
  },
  {
    id: "pm-vishwakarma", name: "PM Vishwakarma", category: "Employment", level: "Central", icon: "🧰",
    tags: ["worker", "entrepreneur"],
    description: "Support for traditional artisans and craftspeople.",
    benefit: "Recognition, skill training, toolkit incentive and credit support.",
    eligibility: ["Artisans in notified traditional trades", "Aged 18+, working with hands and tools"],
    documents: ["Aadhaar Card", "Mobile number", "Bank account"],
    steps: ["Register at a Common Service Centre", "Complete biometric Aadhaar e-KYC", "Get verified at Gram Panchayat / ULB level", "Receive PM Vishwakarma certificate and ID"],
    link: "https://pmvishwakarma.gov.in/", rules: { minAge: 18, occupations: ["Self-employed", "Worker"] }
  },
  {
    id: "skill-india", name: "Skill India Mission", category: "Employment", level: "Central", icon: "🛠️",
    tags: ["youth", "student", "worker"],
    description: "Skill development and vocational training opportunities.",
    benefit: "Training, certification and placement support.",
    eligibility: ["Candidates interested in skill development", "Requirements vary by training programme"],
    documents: ["Aadhaar Card", "Education certificate", "Bank details"],
    steps: ["Visit Skill India Digital", "Create your profile", "Search and enrol in a course", "Take the assessment and get certified"],
    link: "https://www.skillindiadigital.gov.in/", rules: { minAge: 15, occupations: ["Student", "Unemployed", "Worker", "Other"] }
  },
  {
    id: "pmkvy", name: "PM Kaushal Vikas Yojana", category: "Employment", level: "Central", icon: "🎯",
    tags: ["youth"],
    description: "Short-term skill training with certification.",
    benefit: "Free short-term training and a recognised certificate.",
    eligibility: ["Indian youth, generally school/college drop-outs or unemployed", "Check the current course-wise age limit"],
    documents: ["Aadhaar Card", "Education proof", "Bank account"],
    steps: ["Find a training centre on the PMKVY site", "Choose a job role", "Enrol and attend training", "Appear for assessment"],
    link: "https://www.pmkvyofficial.org/", rules: { minAge: 15, maxAge: 45, occupations: ["Student", "Unemployed"] }
  },
  {
    id: "startup-india", name: "Startup India", category: "Employment", level: "Central", icon: "💡",
    tags: ["entrepreneur", "youth"],
    description: "Recognition and benefits for innovative startups.",
    benefit: "Startup recognition, tax and compliance benefits, funding access.",
    eligibility: ["Eligible private limited company / LLP / partnership", "Innovative business model"],
    documents: ["Incorporation certificate", "PAN", "Business description"],
    steps: ["Register your entity", "Create a profile on the Startup India portal", "Apply for DPIIT recognition", "Explore schemes and funding"],
    link: "https://www.startupindia.gov.in/", rules: { minAge: 18, occupations: ["Self-employed", "Student", "Unemployed"] }
  },
  {
    id: "mgnrega", name: "MGNREGA", category: "Employment", level: "Central", icon: "⛏️",
    tags: ["worker", "farmer"],
    description: "Guaranteed wage employment for rural households.",
    benefit: "Up to 100 days of wage employment per household per year.",
    eligibility: ["Adult members of rural households", "Willing to do unskilled manual work"],
    documents: ["Aadhaar Card", "Passport photo", "Bank / post office account"],
    steps: ["Apply for a Job Card at your Gram Panchayat", "Submit a written request for work", "Get work within 15 days", "Wages are paid to your account"],
    link: "https://nrega.nic.in/", rules: { minAge: 18, occupations: ["Worker", "Unemployed", "Farmer"] }
  },
  {
    id: "ujjwala", name: "PM Ujjwala Yojana", category: "Social Security", level: "Central", icon: "🔥",
    tags: ["women", "bpl"],
    description: "LPG connections for women from eligible poor households.",
    benefit: "Free LPG connection assistance as per scheme rules.",
    eligibility: ["Adult woman from an eligible household", "No existing LPG connection in the household"],
    documents: ["Aadhaar Card", "Ration Card", "Bank details", "KYC form"],
    steps: ["Visit your nearest LPG distributor", "Fill the Ujjwala KYC form", "Submit documents", "Connection is issued after verification"],
    link: "https://www.pmuy.gov.in/", rules: { gender: "Female", minAge: 18, maxIncome: 200000 }
  },
  {
    id: "apy", name: "Atal Pension Yojana", category: "Social Security", level: "Central", icon: "👴",
    tags: ["worker", "senior"],
    description: "Guaranteed monthly pension after age 60 for unorganised-sector workers.",
    benefit: "Monthly pension of ₹1,000 to ₹5,000 depending on contribution.",
    eligibility: ["Age 18-40 with a savings bank account", "Pension begins at 60"],
    documents: ["Aadhaar Card", "Bank account", "Mobile number"],
    steps: ["Visit your bank", "Choose your pension amount", "Fill the APY form", "Enable auto-debit"],
    link: "https://www.jansuraksha.gov.in/", rules: { minAge: 18, maxAge: 40 }
  },
  {
    id: "pmjjby", name: "PM Jeevan Jyoti Bima Yojana", category: "Social Security", level: "Central", icon: "🛡️",
    tags: ["worker"],
    description: "Low-cost life insurance renewable every year.",
    benefit: "₹2 lakh life cover for a small annual premium.",
    eligibility: ["Age 18-50 with a bank account", "Auto-debit consent required"],
    documents: ["Aadhaar Card", "Bank account"],
    steps: ["Visit your bank or net banking", "Fill the enrolment form", "Give auto-debit consent", "Keep the acknowledgement"],
    link: "https://www.jansuraksha.gov.in/", rules: { minAge: 18, maxAge: 50 }
  },
  {
    id: "pmsby", name: "PM Suraksha Bima Yojana", category: "Social Security", level: "Central", icon: "🩹",
    tags: ["worker"],
    description: "Accident insurance for a very small annual premium.",
    benefit: "₹2 lakh for accidental death / full disability (₹1 lakh partial).",
    eligibility: ["Age 18-70 with a bank account", "Auto-debit consent required"],
    documents: ["Aadhaar Card", "Bank account"],
    steps: ["Visit your bank or net banking", "Fill the enrolment form", "Give auto-debit consent"],
    link: "https://www.jansuraksha.gov.in/", rules: { minAge: 18, maxAge: 70 }
  },
  {
    id: "pmjdy", name: "PM Jan Dhan Yojana", category: "Social Security", level: "Central", icon: "🏦",
    tags: ["bpl", "worker"],
    description: "Zero-balance bank accounts with insurance and RuPay card.",
    benefit: "Basic savings account, RuPay debit card and accident cover.",
    eligibility: ["Any Indian citizen without a bank account", "Age 10+"],
    documents: ["Aadhaar Card or other valid ID", "Passport photo"],
    steps: ["Visit any bank branch or Bank Mitra", "Fill the account opening form", "Submit KYC", "Receive passbook and RuPay card"],
    link: "https://pmjdy.gov.in/", rules: { minAge: 10 }
  },
  {
    id: "nsap", name: "National Social Assistance (Pension)", category: "Social Security", level: "Central", icon: "🧓",
    tags: ["senior", "bpl"],
    description: "Old-age, widow and disability pensions for poor households.",
    benefit: "Monthly pension under the applicable NSAP component.",
    eligibility: ["Age 60+ for old-age pension (other components for widows / disabled)", "Below-poverty-line households"],
    documents: ["Aadhaar Card", "Age proof", "BPL / income proof", "Bank passbook"],
    steps: ["Contact your Gram Panchayat / Municipal office", "Submit the pension application", "Verification by the authority", "Pension credited monthly"],
    link: "https://nsap.nic.in/", rules: { minAge: 60 }
  },
  {
    id: "eshram", name: "e-Shram (Unorganised Workers)", category: "Social Security", level: "Central", icon: "📇",
    tags: ["worker"],
    description: "National database and ID for unorganised workers.",
    benefit: "e-Shram card with accident insurance cover and access to social security.",
    eligibility: ["Unorganised workers aged 16-59", "Not an EPFO / ESIC member or income-tax payer"],
    documents: ["Aadhaar Card", "Aadhaar-linked mobile", "Bank account"],
    steps: ["Visit the e-Shram portal or a CSC", "Verify with Aadhaar OTP", "Fill your work and bank details", "Download your UAN card"],
    link: "https://eshram.gov.in/", rules: { minAge: 16, maxAge: 59, occupations: ["Worker", "Self-employed", "Farmer"] }
  },
  {
    id: "pmgkay", name: "PM Garib Kalyan Anna Yojana", category: "Social Security", level: "Central", icon: "🍚",
    tags: ["bpl"],
    description: "Free foodgrains for eligible ration-card households.",
    benefit: "Free foodgrain every month to eligible NFSA families.",
    eligibility: ["Households covered under the National Food Security Act", "Valid ration card"],
    documents: ["Ration Card", "Aadhaar Card"],
    steps: ["Check ration card status on the state food portal", "Visit your fair-price shop", "Authenticate with Aadhaar / ration card"],
    link: "https://nfsa.gov.in/", rules: {}
  },
  {
    id: "swavlamban", name: "UDID Disability Card", category: "Social Security", level: "Central", icon: "♿",
    tags: ["disabled"],
    description: "Unique Disability ID for access to benefits and concessions.",
    benefit: "One national ID for disability certificate and scheme benefits.",
    eligibility: ["Persons with specified disabilities", "Certification by a medical authority"],
    documents: ["Aadhaar Card", "Passport photo", "Disability certificate (if available)"],
    steps: ["Apply on the Swavlamban portal", "Upload documents", "Attend medical assessment if asked", "Download the UDID card"],
    link: "https://www.swavlambancard.gov.in/", rules: {}
  },
  {
    id: "pm-surya-ghar", name: "PM Surya Ghar Muft Bijli Yojana", category: "Housing", level: "Central", icon: "☀️",
    tags: ["entrepreneur"],
    description: "Rooftop solar subsidy for households.",
    benefit: "Central subsidy on rooftop solar and lower electricity bills.",
    eligibility: ["Households owning a house with a suitable roof", "Valid electricity connection"],
    documents: ["Aadhaar Card", "Electricity bill", "Bank details"],
    steps: ["Register on the PM Surya Ghar portal", "Apply through your electricity distributor", "Install with a listed vendor", "Submit details for subsidy"],
    link: "https://pmsuryaghar.gov.in/", rules: {}
  },
  {
    id: "ap-talliki", name: "Talliki Vandanam (AP)", category: "Education", level: "State", state: "Andhra Pradesh", icon: "👩‍👧",
    tags: ["women", "student"],
    description: "Andhra Pradesh support for mothers / guardians to keep children in school.",
    benefit: "Financial support as notified by the AP Government.",
    eligibility: ["Families in Andhra Pradesh with school-going children", "Conditions as notified (attendance, income etc.)"],
    documents: ["Aadhaar Card", "Ration / white card", "Student school ID", "Bank account"],
    steps: ["Check notices on the AP government portal", "Contact your village / ward secretariat", "Complete verification", "Check payment status"],
    link: "https://www.ap.gov.in/", rules: { state: "Andhra Pradesh" }
  },
  {
    id: "ap-annadata", name: "Annadata Sukhibhava (AP)", category: "Agriculture", level: "State", state: "Andhra Pradesh", icon: "🚜",
    tags: ["farmer"],
    description: "Andhra Pradesh farmer income support, working alongside PM-KISAN.",
    benefit: "Annual state support as notified by the AP Government.",
    eligibility: ["Farmer families in Andhra Pradesh", "Details as notified by the state"],
    documents: ["Aadhaar Card", "Land / tenancy records", "Bank account"],
    steps: ["Contact your Rythu Seva Kendram", "Check your name on the beneficiary list", "Complete e-KYC", "Raise a grievance if missing"],
    link: "https://www.ap.gov.in/", rules: { state: "Andhra Pradesh", occupations: ["Farmer"] }
  },
  {
    id: "ap-ntr-vaidya", name: "Dr. NTR Vaidya Seva (AP)", category: "Health", level: "State", state: "Andhra Pradesh", icon: "⚕️",
    tags: ["bpl"],
    description: "Andhra Pradesh health assurance for eligible families.",
    benefit: "Cashless treatment in network hospitals as per state rules.",
    eligibility: ["Eligible families in Andhra Pradesh", "Valid health / ration card"],
    documents: ["Aadhaar Card", "Ration / health card", "Referral if required"],
    steps: ["Visit a network hospital Arogya Mitra", "Show your card and ID", "Get pre-authorisation and treatment"],
    link: "https://www.ap.gov.in/", rules: { state: "Andhra Pradesh" }
  }
];

// ---- custom schemes added from the Admin dashboard (saved in this browser) ----
function loadCustomSchemes() {
  try {
    const a = JSON.parse(localStorage.getItem("customSchemes") || "[]");
    return Array.isArray(a) ? a : [];
  } catch (e) { return []; }
}
const SCHEMES = BASE_SCHEMES.concat(loadCustomSchemes());

const CATEGORIES = ["Education", "Health", "Agriculture", "Housing", "Employment", "Women & Child", "Social Security"];
const AUDIENCES = [
  ["farmer", "Farmers"], ["student", "Students"], ["women", "Women & girls"], ["senior", "Senior citizens"],
  ["worker", "Workers"], ["entrepreneur", "Entrepreneurs"], ["youth", "Youth"], ["disabled", "Persons with disabilities"], ["bpl", "Low-income families"]
];
const STATES = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Jammu & Kashmir","Ladakh","Puducherry","Chandigarh","Other"];

function getScheme(id) { return SCHEMES.find(s => s.id === id); }

// ---- indicative matching engine ----
// p = { age, gender, state, income (lower bound of the chosen range, in ₹), occupation }
function matchSchemes(p) {
  const out = [];
  SCHEMES.forEach(s => {
    const r = s.rules || {};
    const why = [];
    if (r.minAge != null && p.age < r.minAge) return;
    if (r.maxAge != null && p.age > r.maxAge) return;
    if (r.gender && r.gender !== p.gender) return;
    if (r.maxIncome != null && p.income > r.maxIncome) return;
    if (r.occupations && !r.occupations.includes(p.occupation)) return;
    if (r.state && r.state !== p.state) return;

    if (r.occupations) why.push("Suits your occupation (" + p.occupation + ")");
    if (r.gender) why.push(r.gender === "Female" ? "Meant for women / girls" : "Meant for men / boys");
    if (r.minAge != null || r.maxAge != null) {
      why.push("Your age fits (" + (r.minAge != null ? r.minAge : "any") + (r.maxAge != null ? "–" + r.maxAge : "+") + ")");
    }
    if (r.maxIncome != null) why.push("Within the income limit");
    if (r.state) why.push("Available in " + r.state);
    out.push({ scheme: s, reasons: why, score: why.length });
  });
  return out.sort((a, b) => b.score - a.score);
}