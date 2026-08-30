import { Program, Trainer, Facility, GalleryItem, PricingPlan, Testimonial, MemberRecord } from '../types';

export const GYM_INFO = {
  name: "KSG DEMO GYM",
  tagline: "Transform Your Body. Upgrade Your Life.",
  phone: "+91 75499 29102",
  whatsapp: "+917549929102",
  email: "contact@ksgdemogym.com",
  address: "Level 4, Zenith Pinnacle Tower, 100 Feet Road, Indiranagar, Bangalore, Karnataka 560038, India",
  hours: "Open 24/7 (Staffed 05:00 AM - 11:00 PM)",
};

export const STATS_DATA = [
  { label: "Happy Members", value: 500, suffix: "+", description: "Dedicated body transformations achieved" },
  { label: "Expert Trainers", value: 10, suffix: "+", description: "CSCS & ACE certified master coaches" },
  { label: "Years Experience", value: 5, suffix: "+", description: "Setting the gold standard in athletic training" },
  { label: "Dedicated Support", value: 24, suffix: "/7", description: "Biometric access & continuous guidance" },
];

export const TIMELINE_DATA = [
  {
    year: "2022",
    title: "Gym Founded",
    subtitle: "The Genesis of Elite Training",
    description: "Founded in Bangalore by national-level strength athletes with a focused 3,000 sq.ft powerlifting and barbell studio dedicated to pure biomechanical form.",
    badge: "Origin",
    icon: "Dumbbell"
  },
  {
    year: "2023",
    title: "500 Members Completed",
    subtitle: "Rapid Community Growth",
    description: "Reached our milestone of 500 active transformations. Introduced clinical InBody 770 biometric tracking and personalized sports nutrition protocols.",
    badge: "Milestone",
    icon: "Users"
  },
  {
    year: "2024",
    title: "New Training Programs",
    subtitle: "Biomechanics & Recovery Spa",
    description: "Imported Italian Panatta isolateral machinery and Swedish Eleiko platforms. Launched Finnish Cedar Infrared Saunas and Cold Plunge hydrotherapy suites.",
    badge: "Innovation",
    icon: "Sparkles"
  },
  {
    year: "2025",
    title: "Premium Fitness Expansion",
    subtitle: "15,000 Sq.Ft Athletic Sanctuary",
    description: "Expanded into Bangalore's premier multi-floor wellness complex with 24/7 RFID biometric check-in, AI Sports Science coach, and artisan fuel bar.",
    badge: "Present & Future",
    icon: "Award"
  }
];

export const PROGRAMS: Program[] = [
  {
    id: "strength-training",
    title: "Strength Training",
    subtitle: "Progressive Overload & Barbell Architecture",
    tagline: "Forge raw power, dense bone density, and structural joint integrity with calibrated Eleiko bars.",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=75&fm=webp",
    duration: "60 - 75 Mins",
    caloriesBurn: "450 - 700 kcal",
    level: "All Levels (Periodized)",
    trainer: {
      name: "Marcus Vance",
      role: "Head Strength Coach",
      avatar: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=200&q=75&fm=webp"
    },
    benefits: [
      "Targeted progressive overload protocols",
      "Eleiko Olympic barbells & calibrated cast-iron plates",
      "Form biomechanics correction using high-speed video feedback",
      "Periodized strength cycles tailored to individual recovery",
      "Injury prevention and tendon strengthening"
    ],
    schedule: "Daily Sessions: 06:00 AM | 09:00 AM | 05:30 PM | 07:30 PM",
    description: "Our signature Strength Training program focuses on compound barbell movements, calibrated competition plates, and periodized volume. Build unbreakable tendon strength, explosive force, and structural symmetry under master coach supervision.",
    ctaText: "Start Program",
    badge: "Strength Focus"
  },
  {
    id: "muscle-building",
    title: "Muscle Building",
    subtitle: "Hypertrophy & Physique Architecture",
    tagline: "Sculpt lean, dense muscle fibers through isolateral Panatta machinery and time-under-tension protocols.",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=75&fm=webp",
    duration: "60 - 75 Mins",
    caloriesBurn: "500 - 750 kcal",
    level: "Intermediate & Advanced",
    trainer: {
      name: "Vikram Singhania",
      role: "Master Transformation Director",
      avatar: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=200&q=75&fm=webp"
    },
    benefits: [
      "Imported Panatta isolateral pin-select & plate-loaded machines",
      "Optimized mechanical tension and metabolic stress splits",
      "Targeted mind-muscle connection and peak contraction cues",
      "Weekly muscle volume tracking and recovery management",
      "Nutrient timing guidance for clean lean mass accrual"
    ],
    schedule: "Daily Sessions: 07:00 AM | 10:00 AM | 06:00 PM | 08:00 PM",
    description: "Engineered specifically for maximum muscular hypertrophy and proportional aesthetics. Utilize custom Italian plate-loaded machinery to target every muscle head safely with continuous mechanical tension.",
    ctaText: "Start Program",
    badge: "Hypertrophy"
  },
  {
    id: "fat-loss",
    title: "Fat Loss Conditioning",
    subtitle: "High-Output VO2 Max & Metabolic Shred",
    tagline: "Elevate your anaerobic threshold and shred fat with dynamic Woodway sprints and SkiErg intervals.",
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1000&q=75&fm=webp",
    duration: "45 - 60 Mins",
    caloriesBurn: "600 - 900 kcal",
    level: "High Intensity",
    trainer: {
      name: "Elena Rostova",
      role: "HIIT & Endurance Specialist",
      avatar: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=200&q=75&fm=webp"
    },
    benefits: [
      "Curved Woodway treadmills for natural stride biomechanics",
      "Concept2 SkiErgs, Rowers, and Assault AirBikes",
      "Real-time heart rate leaderboard with metabolic zone tracking",
      "EPOC afterburn effect elevating metabolism for up to 36 hours",
      "Stamina conditioning that protects hard-earned lean muscle"
    ],
    schedule: "Daily Sessions: 06:30 AM | 09:30 AM | 05:30 PM | 07:30 PM",
    description: "Designed to strip stubborn body fat while boosting cardiovascular output. High-energy metabolic circuits combine non-motorized sprint tracks with functional resistance for rapid fat oxidation.",
    ctaText: "Start Program",
    badge: "Fat Shred"
  },
  {
    id: "functional-training",
    title: "Functional Training",
    subtitle: "CrossFit, Agility & Explosive Power",
    tagline: "Unleash athletic versatility with Olympic lifting, kettlebell complexes, and turf sprints.",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=75&fm=webp",
    duration: "60 Mins",
    caloriesBurn: "550 - 800 kcal",
    level: "All Levels (Scalable)",
    trainer: {
      name: "Devraj Patel",
      role: "Olympic Lifting & CrossFit Head",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=75&fm=webp"
    },
    benefits: [
      "30-meter high-density sled push turf track",
      "Olympic snatch and clean & jerk barbell coaching",
      "Gymnastic ring work, pull-up rigs, and plyometric boxes",
      "Daily Workouts of the Day (WOD) with live performance leaderboards",
      "Rotational core strength, agility, and dynamic endurance"
    ],
    schedule: "Daily WODs: 06:30 AM | 08:00 AM | 06:30 PM | 08:00 PM",
    description: "Functional training builds real-world athleticism. Combine multi-joint Olympic complexes, heavy sled drives, and bodyweight gymnastics to develop speed, power, and mental resilience.",
    ctaText: "Start Program",
    badge: "High Energy"
  },
  {
    id: "personal-training",
    title: "Personal Training",
    subtitle: "1-on-1 Bespoke Body Engineering",
    tagline: "Dedicated master coaching tailored strictly to your genetic blueprint, posture, and lifestyle.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=75&fm=webp",
    duration: "60 Mins Private",
    caloriesBurn: "600 - 850 kcal",
    level: "Exclusive 1-on-1",
    trainer: {
      name: "Vikram Singhania",
      role: "Master Transformation Director",
      avatar: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=200&q=75&fm=webp"
    },
    benefits: [
      "Complete InBody 770 composition assessment every 14 days",
      "Customized nutrient timing and macro protocol by sports nutritionist",
      "Heart rate variability & central nervous system recovery monitoring",
      "Private VIP training floor access with zero equipment wait time",
      "24/7 direct coach messaging on WhatsApp for continuous support"
    ],
    schedule: "Flexible scheduling 24/7 on your personal app calendar",
    description: "Experience the pinnacle of individualized coaching. Your dedicated trainer conducts clinical assessments of posture, mobility, and metabolic rate to construct a bulletproof roadmap with real-time adjustments.",
    ctaText: "Book Trainer",
    badge: "VIP Coaching"
  },
  {
    id: "athletic-performance",
    title: "Athletic Performance",
    subtitle: "Powerlifting & Maximal Force Output",
    tagline: "Calibrated Eleiko competition discs, monolifts, and elite periodization for lifters.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=75&fm=webp",
    duration: "75 - 90 Mins",
    caloriesBurn: "500 - 750 kcal",
    level: "Intermediate & Competitive",
    trainer: {
      name: "Marcus Vance",
      role: "Head Strength Coach",
      avatar: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=200&q=75&fm=webp"
    },
    benefits: [
      "IPF-spec calibrated steel discs and 29mm competition power bars",
      "RPE-based autoregulated block periodization for peak force",
      "Detailed sticking point and velocity bar path biomechanics analysis",
      "Meet prep, attempt selection, and peak taper execution",
      "Specialized equipment: safety squat bars, trap bars, and band pegs"
    ],
    schedule: "Mon, Wed, Fri, Sat: 05:00 PM - 08:30 PM",
    description: "Master the Big Three: Squat, Bench Press, and Deadlift. Structured periodization designed to shatter personal records safely with calibrated competition equipment and elite coaching cues.",
    ctaText: "Start Program",
    badge: "Elite Force"
  }
];

export const TRAINERS: Trainer[] = [
  {
    id: "marcus-vance",
    name: "Marcus Vance",
    role: "Head Strength & Conditioning Coach",
    experience: "14+ Years Experience",
    specialization: "Hypertrophy, Powerlifting & Biomechanics",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=75&fm=webp",
    bio: "Former national powerlifting champion and certified CSCS coach. Marcus specializes in heavy compound lifts, structural symmetry, and bulletproofing joints against injury.",
    certifications: ["NSCA Certified Strength & Conditioning Specialist (CSCS)", "USA Weightlifting Level 2", "FMS Functional Movement Screen Certified"],
    achievements: ["Coached 120+ competitive athletes", "Keynote Speaker at Asian Fitness Summit", "99.4% Client Transformation Success"],
    instagram: "@marcus_strength",
    rating: 4.9,
    clientsTrained: "850+",
    availableDays: ["Monday", "Wednesday", "Friday", "Saturday"],
    availableSlots: ["06:00 AM", "08:00 AM", "05:00 PM", "07:00 PM"]
  },
  {
    id: "vikram-singhania",
    name: "Vikram Singhania",
    role: "Master Transformation Director",
    experience: "11+ Years Experience",
    specialization: "Celebrity Body Recomposition & Clinical Nutrition",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=600&q=75&fm=webp",
    bio: "Vikram combines precision metabolic tracking with progressive overload. He has shaped high-profile corporate leaders and athletes with sustainable lifestyle adjustments.",
    certifications: ["ACE Master Personal Trainer", "Precision Nutrition Level 2 Certified", "Kettlebell Athletics Specialist"],
    achievements: ["Transformations featured in Men's Health", "Over 20,000 coaching hours completed", "InBody Elite Master Coach"],
    instagram: "@vikram_ironfit",
    rating: 5.0,
    clientsTrained: "1,200+",
    availableDays: ["Monday", "Tuesday", "Thursday", "Friday", "Sunday"],
    availableSlots: ["07:00 AM", "09:30 AM", "06:00 PM", "08:00 PM"]
  },
  {
    id: "elena-rostova",
    name: "Elena Rostova",
    role: "Lead HIIT & Athletic Conditioning Coach",
    experience: "9+ Years Experience",
    specialization: "VO2 Max Endurance, HIIT & Shred Protocol",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=600&q=75&fm=webp",
    bio: "Olympic track qualifier turned high-intensity conditioning architect. Elena commands high-octane cardio sessions that maximize heart health and athletic stamina.",
    certifications: ["NASM Performance Enhancement Specialist (PES)", "TRX Master Instructor", "CrossFit Level 3 Coach"],
    achievements: ["Designed KSG High-Output Circuit Method", "Sub-3 Hour Marathon Finisher", "Voted Top Coach 2024"],
    instagram: "@elena_athletic",
    rating: 4.9,
    clientsTrained: "650+",
    availableDays: ["Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"],
    availableSlots: ["06:30 AM", "10:00 AM", "05:30 PM", "07:30 PM"]
  },
  {
    id: "aria-thorne",
    name: "Aria Thorne",
    role: "Mobility Director & Yoga Master",
    experience: "10+ Years Experience",
    specialization: "Athletic Mobility, Fascial Release & Breathwork",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=75&fm=webp",
    bio: "Specializing in athletic recovery, joint mobility, and posture alignment. Aria helps lifters and runners unlock full range of motion while drastically reducing injury risks.",
    certifications: ["E-RYT 500 Yoga Alliance", "FRC Functional Range Conditioning Specialist", "Oxygen Advantage Breath Coach"],
    achievements: ["Restored over 400 lifters from chronic lower back tightness", "Developer of the KSG Spine Flow Series"],
    instagram: "@aria_flowlife",
    rating: 5.0,
    clientsTrained: "700+",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Friday", "Saturday"],
    availableSlots: ["07:00 AM", "08:30 AM", "05:00 PM", "06:30 PM"]
  },
  {
    id: "devraj-patel",
    name: "Devraj Patel",
    role: "Olympic Lifting & CrossFit Head",
    experience: "8+ Years Experience",
    specialization: "Olympic Snatch/Clean, Plyometrics & Agility",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=75&fm=webp",
    bio: "Devraj brings raw intensity to functional movement. His technical breakdown of the Olympic lifts ensures members build rapid power safely.",
    certifications: ["CrossFit Level 3 Trainer (CF-L3)", "USAW Sports Performance Coach", "ISSA Strength & Conditioning"],
    achievements: ["Ranked Top 10 in National CrossFit Open", "Trained 30+ Podium CrossFit Competitors"],
    instagram: "@devraj_crossfit",
    rating: 4.8,
    clientsTrained: "520+",
    availableDays: ["Monday", "Wednesday", "Thursday", "Saturday"],
    availableSlots: ["06:00 AM", "08:00 AM", "06:00 PM", "07:30 PM"]
  },
  {
    id: "samantha-rao",
    name: "Samantha Rao",
    role: "Physique & Rehabilitation Coach",
    experience: "7+ Years Experience",
    specialization: "Women's Glute/Core Architecture & Posture Rehab",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=75&fm=webp",
    bio: "Samantha blends physical therapy insights with progressive resistance training to create aesthetically sculpted, pain-free physiques.",
    certifications: ["B.Sc Physiotherapy & Sports Rehabilitation", "ACE Certified Personal Trainer", "Pre/Post-Natal Fitness Specialist"],
    achievements: ["Helped 350+ women achieve sustainable body recomp", "Corporate Ergonomics Consultant for Tech Firms"],
    instagram: "@samantha_rehabfit",
    rating: 4.9,
    clientsTrained: "480+",
    availableDays: ["Tuesday", "Wednesday", "Friday", "Sunday"],
    availableSlots: ["07:30 AM", "10:30 AM", "04:30 PM", "06:30 PM"]
  }
];

export const FACILITIES: Facility[] = [
  {
    id: "free-weights",
    title: "Free Weights & Calibrated Rigs",
    category: "Heavy Iron & Eleiko Platforms",
    description: "Swedish Eleiko Olympic calibrated barbells, IPF-spec competition power racks, and precision dumbbells ranging from 2.5 kg to 70 kg.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=75&fm=webp",
    features: [
      "Eleiko IWF-certified Olympic Barbells & Calibrated Steel Discs",
      "Cast Iron & Urethane Dumbbells from 2.5 kg to 70 kg in 2.5kg steps",
      "Solid Oak Shock-Absorbent Olympic Lifting Platforms",
      "Competition Bench Presses with Safety Rollers & Spotter Stands"
    ],
    highlight: "Calibrated Competition Equipment"
  },
  {
    id: "strength-machines",
    title: "Isolateral Strength Machines",
    category: "Italian Panatta Machinery",
    description: "State-of-the-art Italian Panatta isolateral plate-loaded and pin-selected machines engineered for anatomical biomechanics.",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1000&q=75&fm=webp",
    features: [
      "Panatta Super Squat, Belt Squat & Pendulum Leg Press",
      "Dual Cable High-Tension Functional Columns",
      "Converging Chest & Incline Isolateral Press Systems",
      "Linear Roller Incline & Flat Hack Squats"
    ],
    highlight: "Italian Panatta Biomechanics"
  },
  {
    id: "cardio-area",
    title: "Cardio Conditioning Arena",
    category: "VO2 Max & Aerobic Theater",
    description: "Curved non-motorized Woodway sprint tracks, Concept2 Rowers, SkiErgs, and Assault AirBikes with real-time biometric telemetry.",
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1000&q=75&fm=webp",
    features: [
      "Curved Non-Motorized Woodway Treadmills for natural stride dynamics",
      "Concept2 SkiErgs, Rowers & Echo AirBikes",
      "StairMaster 8Gx Gauntlet Step Mills",
      "Real-time Polar & Myzone HR Telemetry Monitors"
    ],
    highlight: "Woodway & Concept2 Rig"
  },
  {
    id: "functional-area",
    title: "Functional Turf & Rig Arena",
    category: "CrossFit & Athletic Agility",
    description: "30-meter high-density indoor sprint turf, Rogue Monster rigs, Olympic lifting platforms, and heavy sled drive lanes.",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=75&fm=webp",
    features: [
      "30-Meter High-Density Heavy Sled Prowler Track",
      "Custom Multi-Station Rogue Monster Pull-Up Rig",
      "Competition Russian Kettlebells from 8 kg to 48 kg",
      "Climbing Ropes, Gymnastic Rings & Plyo Box Stacks"
    ],
    highlight: "30m Turf & Rogue Rigs"
  },
  {
    id: "locker-area",
    title: "Luxury Locker Suites",
    category: "Spa Amenities & Dressing Rooms",
    description: "Italian Carrara marble dressing lounges, keyless RFID biometric lockers, Dyson Supersonic hair stations, and rainforest showers.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=75&fm=webp",
    features: [
      "Biometric Pin & RFID Keyless Luxury Smart Lockers",
      "Plush Egyptian Cotton Towels & Bathrobe Service",
      "Dyson Supersonic Hair Care Styling Bars",
      "Complimentary Malin+Goetz Organic Grooming Essentials"
    ],
    highlight: "5-Star Spa Grooming"
  },
  {
    id: "recovery-area",
    title: "Recovery Suite & Cryo Plunge",
    category: "Hydrotherapy & Biohacking",
    description: "Finnish Cedar infrared saunas, 4°C chilled stainless steel cold plunges, and Normatec air-compression boots to slash soreness.",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1000&q=75&fm=webp",
    features: [
      "Finnish Cedar Full-Spectrum Infrared Sauna (Up to 85°C)",
      "High-Volume 4°C Chilled Stainless Steel Hydrotherapy Plunge",
      "Eucalyptus-Infused Aromatherapy Crystal Steam Suite",
      "Normatec Dynamic Air Compression Recovery Boots"
    ],
    highlight: "Infrared Sauna & 4°C Plunge"
  },
  {
    id: "gym-interior",
    title: "Premium Gym Interior",
    category: "15,000 Sq.Ft Open Architecture",
    description: "Sprawling multi-level athletic sanctuary with medical-grade HEPA air exchange, acoustic zoning, and glare-free architectural lighting.",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1000&q=75&fm=webp",
    features: [
      "15,000 Sq.Ft Open Architecture Floor Plan",
      "Hospital-Grade HEPA-14 Air Filtration exchanging fresh air every 6 mins",
      "Custom Acoustically Tuned Surround Sound System",
      "Glare-Free Architectural Ambient Lighting"
    ],
    highlight: "15,000 Sq.Ft Sanctuary"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Heavy Deadlift on Eleiko Platform",
    category: "workout",
    categoryLabel: "Workout",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=75&fm=webp",
    description: "Member locking out a 210kg personal record on calibrated Eleiko competition plates.",
    tag: "Deadlift"
  },
  {
    id: "gal-2",
    title: "Annual KSG Summer Push-Pull Championship",
    category: "events",
    categoryLabel: "Events",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=75&fm=webp",
    description: "Over 150 members competed in our annual athletic festival and lifting showcase.",
    tag: "Championship"
  },
  {
    id: "gal-3",
    title: "16-Week Recomposition - Rahul M.",
    category: "transformation",
    categoryLabel: "Transformation",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=75&fm=webp",
    description: "Dropped from 24% to 11% body fat while building 4.5kg of dense lean muscle.",
    tag: "Recomp"
  },
  {
    id: "gal-4",
    title: "Master Coach Marcus Vance in Action",
    category: "trainers",
    categoryLabel: "Trainers",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=75&fm=webp",
    description: "Guiding an isolateral shoulder press with millimeter biomechanical accuracy.",
    tag: "Coaching"
  },
  {
    id: "gal-5",
    title: "Functional Turf Sprint & Sled Push",
    category: "workout",
    categoryLabel: "Workout",
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=800&q=75&fm=webp",
    description: "High-intensity athletic conditioning on the 30-meter indoor shock-absorbent turf.",
    tag: "HIIT"
  },
  {
    id: "gal-6",
    title: "VIP Charity Lifting Marathon 2024",
    category: "events",
    categoryLabel: "Events",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=75&fm=webp",
    description: "Raised ₹5,00,000 for youth sports development in Karnataka with 24-hr lifting relay.",
    tag: "Charity"
  },
  {
    id: "gal-7",
    title: "Post-Workout Infrared Sauna Ritual",
    category: "workout",
    categoryLabel: "Workout",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=75&fm=webp",
    description: "Athletes flushing cortisol in the 80°C cedar sauna after heavy leg day.",
    tag: "Sauna"
  },
  {
    id: "gal-8",
    title: "Transformation Spotlight - Priya K.",
    category: "transformation",
    categoryLabel: "Transformation",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=75&fm=webp",
    description: "From chronic desk stiffness to completing her first Olympic triathlon in 9 months.",
    tag: "Endurance"
  },
  {
    id: "gal-9",
    title: "Coach Elena Rostova Leading HIIT Squad",
    category: "trainers",
    categoryLabel: "Trainers",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=800&q=75&fm=webp",
    description: "Heart rates peaking at 178 BPM in the morning sprint conditioning theater.",
    tag: "Cardio"
  },
  {
    id: "gal-10",
    title: "Olympic Clean & Jerk Workshop",
    category: "events",
    categoryLabel: "Events",
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=75&fm=webp",
    description: "International guest coach clinic breaking down bar velocity and catch stability.",
    tag: "Workshop"
  },
  {
    id: "gal-11",
    title: "Mobility & Hip Flow by Aria Thorne",
    category: "trainers",
    categoryLabel: "Trainers",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=75&fm=webp",
    description: "Athletic mobility class unlocking tight hip flexors and thoracic rotation.",
    tag: "Mobility"
  },
  {
    id: "gal-12",
    title: "Transformation Spotlight - Arvind S.",
    category: "transformation",
    categoryLabel: "Transformation",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=75&fm=webp",
    description: "Lost 18kg in 20 weeks with Coach Vikram. Replaced blood pressure meds with deadlifts.",
    tag: "Health"
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "basic",
    name: "BASIC PLAN",
    price: 2000,
    period: "/month",
    tagline: "Essential access for the disciplined self-starter.",
    features: [
      "Full Gym Access (Open 24/7)",
      "Locker Facility & RFID Entry Pass",
      "General Equipment Orientation",
      "Rainfall Showers & Hydration Bar",
      "Free High-Speed Wi-Fi & Lounge Access",
      "Basic In-App Workout Logger"
    ],
    ctaText: "CHOOSE BASIC",
    discountBadge: "Billed Monthly"
  },
  {
    id: "premium",
    name: "PREMIUM PLAN",
    price: 3000,
    period: "/month",
    tagline: "The most popular choice for accelerated transformation.",
    isPopular: true,
    features: [
      "Unlimited 24/7 All-Access Gym Pass",
      "Personal Trainer Guidance (8 Sessions/mo)",
      "Custom Macro Diet Plan by Sports Nutritionist",
      "Monthly InBody 770 Body Composition Scans",
      "Infrared Sauna & Steam Room Access",
      "Unlimited Access to All HIIT & Group Classes",
      "Complimentary KSG Welcome Athletic Kit",
      "Priority Locker Reservation"
    ],
    ctaText: "GET PREMIUM",
    discountBadge: "MOST POPULAR"
  },
  {
    id: "vip",
    name: "VIP PLAN",
    price: 5000,
    period: "/month",
    tagline: "The ultimate tier: Private coach, priority suites & unlimited recovery.",
    isVIP: true,
    features: [
      "Dedicated 1-on-1 Master Personal Coach",
      "Custom Workout & Real-Time Periodized Plan",
      "24/7 Direct WhatsApp Coach Concierge Support",
      "Priority VIP Private Lifting Zone Reservation",
      "Unlimited Cryo, Sauna & Cold Plunge Spa",
      "Free Daily Pre/Post Workout Fuel Bar Shakes",
      "Reserved Valet Parking & Executive Dressing Suite",
      "2 Free VIP Guest Passes Every Month"
    ],
    ctaText: "CHOOSE VIP",
    discountBadge: "ELITE MEMBERSHIP"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Rohan Kapoor",
    role: "Tech Founder & Powerlifter",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    transformation: "-18 kg Fat Loss & 180kg Deadlift",
    quote: "KSG Demo Gym is in a league of its own. The Italian Panatta machines, the lightning fast staff, and Coach Vikram's nutritional guidance changed my health completely while running a 70-hour work week.",
    timeframe: "Member for 14 Months"
  },
  {
    id: "2",
    name: "Ananya Deshmukh",
    role: "National Level Squash Athlete",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    transformation: "+24% VO2 Max & Zero Knee Pain",
    quote: "The contrast between standard commercial gyms and KSG is night and day. The cold plunge, infrared sauna, and Aria's mobility routines have kept me injury-free throughout tournament season.",
    timeframe: "Member for 9 Months"
  },
  {
    id: "3",
    name: "Karan Malhotra",
    role: "Corporate Managing Director",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    transformation: "Gained 6.2 kg Lean Muscle",
    quote: "The VIP tier is worth every single rupee. Having a dedicated coach who tracks my sleep and macros on WhatsApp keeps me accountable. This is hands-down the best fitness facility in the country.",
    timeframe: "Member for 2 Years"
  },
  {
    id: "4",
    name: "Sneha Reddy",
    role: "Creative Director",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    transformation: "-12 kg Fat Loss & Fixed Posture",
    quote: "I was intimidated by gyms until I walked into KSG. The coaches don't just count reps; they teach biomechanics with immense patience. The locker rooms and steam room feel like a 5-star hotel.",
    timeframe: "Member for 8 Months"
  }
];

export const INITIAL_MEMBERS_DATA: MemberRecord[] = [
  {
    id: "KSG-MEM-8894",
    name: "Karan Malhotra",
    phone: "+91 75499 29102",
    email: "karan.malhotra@gmail.com",
    planName: "VIP PLAN",
    status: "Active",
    startDate: "15 Jan 2024",
    expiryDate: "15 Jan 2027",
    amount: 5000,
    assignedTrainer: "Vikram Singhania",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "KSG-MEM-8895",
    name: "Natasha Menon",
    phone: "+91 75499 29102",
    email: "natasha.m@designstudio.com",
    planName: "VIP PLAN",
    status: "Active",
    startDate: "01 Feb 2024",
    expiryDate: "01 Feb 2026",
    amount: 5000,
    assignedTrainer: "Vikram Singhania",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "KSG-MEM-8896",
    name: "Rohan Kapoor",
    phone: "+91 75499 29102",
    email: "rohan.k@techgrowth.io",
    planName: "PREMIUM PLAN",
    status: "Active",
    startDate: "10 Mar 2024",
    expiryDate: "10 Mar 2025",
    amount: 3000,
    assignedTrainer: "Marcus Vance",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "KSG-MEM-8897",
    name: "Pooja Sharma",
    phone: "+91 75499 29102",
    email: "pooja.sharma@outlook.com",
    planName: "BASIC PLAN",
    status: "Expiring Soon",
    startDate: "28 Feb 2024",
    expiryDate: "28 Feb 2025",
    amount: 2000,
    assignedTrainer: "Floor Coach",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "KSG-MEM-8898",
    name: "Devendra Verma",
    phone: "+91 75499 29102",
    email: "dev.verma@fintech.co",
    planName: "PREMIUM PLAN",
    status: "Expired",
    startDate: "01 Jan 2023",
    expiryDate: "01 Jan 2024",
    amount: 3000,
    assignedTrainer: "Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
  }
];

export const INITIAL_BOOKINGS_DATA = [
  {
    id: "BKG-901",
    name: "Siddharth Nambiar",
    phone: "+91 75499 29102",
    email: "siddharth.n@gmail.com",
    fitnessGoal: "Weight Loss & Muscle Tone",
    trainerName: "Vikram Singhania",
    date: "Tomorrow",
    timeSlot: "07:00 AM - 08:00 AM",
    status: "Approved" as const,
    createdAt: "25 mins ago",
    notes: "Has mild shoulder impingement from squash. Requested biomechanical assessment."
  },
  {
    id: "BKG-902",
    name: "Meera Krishnan",
    phone: "+91 75499 29102",
    email: "meera.k@biotech.res.in",
    fitnessGoal: "Mobility & Joint Health",
    trainerName: "Aria Thorne",
    date: "Friday",
    timeSlot: "05:30 PM - 06:30 PM",
    status: "Pending" as const,
    createdAt: "1 hour ago",
    notes: "Seeking fascial release and breathwork routines."
  },
  {
    id: "BKG-903",
    name: "Akash Singhal",
    phone: "+91 75499 29102",
    email: "akash.s@venture.vc",
    fitnessGoal: "Strength & Powerlifting",
    trainerName: "Marcus Vance",
    date: "Saturday",
    timeSlot: "09:00 AM - 10:00 AM",
    status: "Approved" as const,
    createdAt: "3 hours ago",
    notes: "Wants to test Eleiko calibrated platform and deadlift programming."
  },
  {
    id: "BKG-904",
    name: "Tanvi Roy",
    phone: "+91 75499 29102",
    email: "tanvi.roy@agency.in",
    fitnessGoal: "HIIT & Cardio Shred",
    trainerName: "Elena Rostova",
    date: "Thursday",
    timeSlot: "06:30 PM - 07:30 PM",
    status: "Completed" as const,
    createdAt: "Yesterday",
    notes: "Attended trial session. Upgraded to Premium Membership!"
  }
];

export const TRUST_CERTIFICATIONS = [
  {
    id: "cert-1",
    title: "Panatta Biomechanics",
    subtitle: "Italian Engineering",
    description: "Plate-loaded converging and diverging axis machines designed to match human musculoskeletal force curves.",
    badge: "Official Partner",
    iconName: "Dumbbell"
  },
  {
    id: "cert-2",
    title: "CSCS & ACE Certified",
    subtitle: "Gold Standard Coaching",
    description: "Every master trainer holds international accreditations in exercise physiology, sports science, and injury rehab.",
    badge: "Accredited",
    iconName: "Award"
  },
  {
    id: "cert-3",
    title: "Medical HEPA Air Flow",
    subtitle: "Sterile Athletic Climate",
    description: "Hospital-grade HEPA 14 positive pressure air exchange ensuring maximum VO2 oxygen uptake during high-intensity lifting.",
    badge: "Clean Climate",
    iconName: "ShieldCheck"
  },
  {
    id: "cert-4",
    title: "24/7 RFID Biometrics",
    subtitle: "Keyless Sanctuary",
    description: "High-security biometric turnstiles allow uninterrupted access 365 days a year for our committed members.",
    badge: "Always Open",
    iconName: "Clock"
  }
];

export const FAQS = [
  {
    q: "How does the Free 1-Day VIP Trial work?",
    a: "Your pass grants 100% full access to our Panatta strength floor, Eleiko platforms, locker rooms, and sauna. You also receive a complimentary InBody 770 biometric scan and 30-minute orientation with a certified trainer. No credit card or hard commitment required."
  },
  {
    q: "What makes KSG Gym different from other commercial gyms?",
    a: "We are an authentic athletic performance facility. We feature medical-grade Panatta isolateral equipment from Italy, Swedish Eleiko IWF platforms, clinical body composition scanners, Finnish Cedar infrared saunas, 4°C cold plunges, and CSCS-certified coaches."
  },
  {
    q: "Can I freeze or pause my membership if I travel?",
    a: "Yes! Quarterly plans can be paused for up to 14 days, and Annual VIP memberships include up to 45 days of complimentary freeze time with zero administrative fees."
  },
  {
    q: "Are personal training sessions included in the membership?",
    a: "Our Premium plan includes 8 monthly 1-on-1 personal training sessions. The VIP plan features unlimited dedicated coaching, bi-weekly InBody scans, and 24/7 direct WhatsApp communication with your master trainer."
  },
  {
    q: "What are the gym operating hours?",
    a: "The gym floor is accessible 24 hours a day, 7 days a week via RFID biometric turnstiles for active members. Master coaching staff and reception concierge are on-site daily from 5:00 AM to 11:00 PM."
  },
  {
    q: "Is there dedicated parking available at the facility?",
    a: "Yes, we provide 3 levels of secure indoor parking with complimentary valet service for all VIP and Annual members."
  }
];

export const AUTOMATED_FOLLOWUPS = [
  {
    step: 1,
    trigger: "Instant on Form Submission (0 Min)",
    channel: "WhatsApp & SMS",
    title: "VIP Pass & Orientation Confirmation",
    message: "Hi {name}! Welcome to KSG DEMO GYM. Your VIP Pass is confirmed. Master Coach will conduct your InBody analysis and training orientation for {planOrGoal}."
  },
  {
    step: 2,
    trigger: "2 Hours Before Scheduled Session",
    channel: "WhatsApp Notification",
    title: "Pre-Workout Preparation",
    message: "Hi {name}, your VIP session is in 2 hours! We've prepared your complimentary locker and hydration kit. See you on the training floor!"
  },
  {
    step: 3,
    trigger: "Post-Trial Check-in (Same Evening)",
    channel: "Master Trainer Message",
    title: "Post-Workout Recovery & Membership Offer",
    message: "Great intensity on the gym floor today {name}! How is the soreness feeling? As discussed, we have locked in your 20% Founder Discount on the VIP Plan."
  }
];



