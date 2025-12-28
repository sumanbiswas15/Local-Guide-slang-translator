// Initial lexicon database populated from product.md

import { SlangTerm, SafetyLevel, Region } from '../types';

export const LEXICON_DATA: SlangTerm[] = [
  // Kolkata Urban Hub (The "Lyadh" Zone)
  {
    word: 'Lyadh',
    banglaScript: 'ল্যাদ',
    meaning: 'Proactive Laziness',
    usage: 'A lifestyle choice; enjoying doing nothing.',
    safetyLevel: SafetyLevel.SAFE_FRIENDLY,
    region: [Region.KOLKATA],
    culturalContext: 'Core concept of Kolkata urban culture, represents the art of productive relaxation',
    examples: ['Aj puro din lyadh korbo', 'Lyadh is a way of life in Kolkata']
  },
  {
    word: 'Aantel',
    banglaScript: 'আঁতেল',
    meaning: 'Pseudo-intellectual',
    usage: 'Someone acting too smart at a tea stall.',
    safetyLevel: SafetyLevel.FRIENDLY_ROAST,
    region: [Region.KOLKATA],
    culturalContext: 'Used to describe someone showing off their knowledge inappropriately',
    examples: ['Oi aantel ta ki bolche', 'Aantel hoye kaj nei']
  },
  {
    word: 'Chap',
    banglaScript: 'চাপ',
    meaning: 'Stress/Pressure',
    usage: 'Used when things are difficult or busy.',
    safetyLevel: SafetyLevel.SAFE_FRIENDLY,
    region: [Region.KOLKATA],
    culturalContext: 'Common expression for stress in daily life',
    examples: ['Khub chap ache', 'Chap niye kaj korchi']
  },
  {
    word: 'Kelane',
    banglaScript: 'ক্যালানে',
    meaning: 'Silly/Grinning',
    usage: 'Someone smiling foolishly like a joker.',
    safetyLevel: SafetyLevel.DO_NOT_USE,
    region: [Region.KOLKATA],
    culturalContext: 'Offensive term that can be hurtful when used to describe someone',
    examples: []
  },
  {
    word: 'Fatafati',
    banglaScript: 'ফাটাফাটি',
    meaning: 'Awesome',
    usage: 'The ultimate compliment for anything good.',
    safetyLevel: SafetyLevel.SAFE_FRIENDLY,
    region: [Region.KOLKATA],
    culturalContext: 'Popular positive expression used widely in Bengali culture',
    examples: ['Fatafati khawa hoyeche', 'Eta fatafati lagche']
  },
  {
    word: 'Poka',
    banglaScript: 'পোকা',
    meaning: 'Obsession',
    usage: 'A "buff" (e.g., Movie-poka, Boi-poka).',
    safetyLevel: SafetyLevel.SAFE_FRIENDLY,
    region: [Region.KOLKATA],
    culturalContext: 'Endearing term for someone passionate about something',
    examples: ['Tui to cinema poka', 'Boi poka hoye gechi']
  },

  // Bardhaman Belt (Rarh Banga & Rural Nuances)
  {
    word: 'Situa',
    banglaScript: 'সিতুয়া',
    meaning: 'Damp/Chilly',
    usage: 'Unique to this region. Used for weather or damp clothes.',
    safetyLevel: SafetyLevel.SAFE_FRIENDLY,
    region: [Region.BARDHAMAN],
    culturalContext: 'Regional weather term specific to Bardhaman area',
    examples: ['Aj situa lagche', 'Kapor gulo situa hoye geche']
  },
  {
    word: 'Bari-ghora',
    banglaScript: 'বাড়ি-ঘোড়া',
    meaning: 'Showing off',
    usage: 'Acting like a rich landlord (Zamindar style).',
    safetyLevel: SafetyLevel.FRIENDLY_ROAST,
    region: [Region.BARDHAMAN],
    culturalContext: 'References the historical zamindar culture of rural Bengal',
    examples: ['Bari-ghora korche keno', 'Zamindar er moto bari-ghora']
  },
  {
    word: 'Pod paka',
    banglaScript: 'পোদ পাকা',
    meaning: 'Precocious/Spoiled',
    usage: 'Someone acting too mature/wicked for their age.',
    safetyLevel: SafetyLevel.SAFE_FRIENDLY,
    region: [Region.BARDHAMAN],
    culturalContext: 'Used to describe children who act beyond their years',
    examples: ['Chele ta pod paka', 'Pod paka hoye geche']
  },
  {
    word: 'Mayya',
    banglaScript: 'মাইয়া',
    meaning: 'Girl',
    usage: 'Regional dialect for "Meye."',
    safetyLevel: SafetyLevel.FRIENDLY_ROAST,
    region: [Region.BARDHAMAN],
    culturalContext: 'Rural dialect variation of the standard Bengali word for girl',
    examples: ['Oi mayya ta ke', 'Mayya gulo elo']
  },
  {
    word: 'Pet hoyeche',
    banglaScript: 'পেট হয়েছে',
    meaning: 'Pregnant',
    usage: 'A very blunt, non-medical way to say someone is pregnant.',
    safetyLevel: SafetyLevel.OFFENSIVE_ANNOYING,
    region: [Region.BARDHAMAN],
    culturalContext: 'Crude way to refer to pregnancy, can be offensive',
    examples: []
  },
  {
    word: 'Poati',
    banglaScript: 'পোয়াতি',
    meaning: 'Pregnant woman',
    usage: 'Traditional/Rural term for a pregnant lady.',
    safetyLevel: SafetyLevel.DO_NOT_USE,
    region: [Region.BARDHAMAN],
    culturalContext: 'Outdated and potentially offensive term for pregnant women',
    examples: []
  },
  {
    word: 'Mag-Bhatar',
    banglaScript: 'মাগ-ভাতার',
    meaning: 'Wife & Husband',
    usage: 'Very crude/low-class way to refer to a married couple.',
    safetyLevel: SafetyLevel.DO_NOT_USE,
    region: [Region.BARDHAMAN],
    culturalContext: 'Highly disrespectful way to refer to married couples',
    examples: []
  },
  {
    word: 'Maagi',
    banglaScript: 'মাগি',
    meaning: 'Girl/Woman',
    usage: 'Historically meant woman, now a heavy sexual slur.',
    safetyLevel: SafetyLevel.DO_NOT_USE,
    region: [Region.BARDHAMAN],
    culturalContext: 'Extremely offensive sexual slur, never appropriate to use',
    examples: []
  },
  {
    word: 'Maagibaji',
    banglaScript: 'মাগিবাড়ি',
    meaning: 'Womanizing',
    usage: 'Running around chasing women for sex.',
    safetyLevel: SafetyLevel.DO_NOT_USE,
    region: [Region.BARDHAMAN],
    culturalContext: 'Vulgar term for inappropriate sexual behavior',
    examples: []
  },
  {
    word: 'Nang korta jawa',
    banglaScript: 'নাঙ করতে যাওয়া',
    meaning: 'Infidelity',
    usage: 'Going to bed with someone other than a spouse.',
    safetyLevel: SafetyLevel.DO_NOT_USE,
    region: [Region.BARDHAMAN],
    culturalContext: 'Crude reference to extramarital affairs',
    examples: []
  },
  {
    word: 'Barobhatari',
    banglaScript: 'বারোভাতারী',
    meaning: 'Slut',
    usage: 'Highly offensive term for a woman with many partners.',
    safetyLevel: SafetyLevel.DO_NOT_USE,
    region: [Region.BARDHAMAN],
    culturalContext: 'Extremely derogatory term for women, never acceptable',
    examples: []
  },

  // Tarakeswar & Hooghly Corridor (Deep Slang & Temple Town)
  {
    word: 'Toto-giri',
    banglaScript: 'টোটো-গিরি',
    meaning: 'E-Rickshaw roaming',
    usage: 'Wasting time traveling aimlessly in a Toto.',
    safetyLevel: SafetyLevel.SAFE_FRIENDLY,
    region: [Region.TARAKESWAR_HOOGHLY],
    culturalContext: 'Modern term referring to the popular e-rickshaw transport',
    examples: ['Toto-giri korchi', 'Puro din toto-giri']
  },
  {
    word: 'Jatri',
    banglaScript: 'যাত্রী',
    meaning: 'Pilgrim',
    usage: 'Refers to the massive Shiva temple crowds.',
    safetyLevel: SafetyLevel.SAFE_FRIENDLY,
    region: [Region.TARAKESWAR_HOOGHLY],
    culturalContext: 'Religious context specific to temple towns like Tarakeswar',
    examples: ['Jatri ra elo', 'Tarakeswar e jatri der bhir']
  },
  {
    word: 'Naite jabo',
    banglaScript: 'নাইতে যাব',
    meaning: 'Bathing',
    usage: 'Local way of saying "I am going to bathe."',
    safetyLevel: SafetyLevel.SAFE_FRIENDLY,
    region: [Region.TARAKESWAR_HOOGHLY],
    culturalContext: 'Regional dialect for bathing, common in rural areas',
    examples: ['Naite jabo ekhon', 'Naite gelo']
  },
  // Offensive terms from Tarakeswar/Hooghly - included for academic completeness but marked as DO_NOT_USE
  {
    word: 'Khankir chala',
    banglaScript: 'খানকির ছেলে',
    meaning: 'Son of a whore',
    usage: 'Extremely offensive insult used in heated fights.',
    safetyLevel: SafetyLevel.DO_NOT_USE,
    region: [Region.TARAKESWAR_HOOGHLY],
    culturalContext: 'Extremely vulgar insult, causes serious social offense',
    examples: []
  },
  {
    word: 'Sodanir pola',
    banglaScript: 'সোদানির পোলা',
    meaning: 'Son of a fucker',
    usage: 'Heavy regional insult, very vulgar.',
    safetyLevel: SafetyLevel.DO_NOT_USE,
    region: [Region.TARAKESWAR_HOOGHLY],
    culturalContext: 'Highly offensive regional curse word',
    examples: []
  },
  {
    word: 'Khanki chudi',
    banglaScript: 'খানকি চুদি',
    meaning: 'Sexual Slur',
    usage: 'Highly offensive sexual slur toward women.',
    safetyLevel: SafetyLevel.DO_NOT_USE,
    region: [Region.TARAKESWAR_HOOGHLY],
    culturalContext: 'Extremely vulgar sexual slur, never appropriate',
    examples: []
  },
  {
    word: 'Chutmarani',
    banglaScript: 'চুতমারানি',
    meaning: 'Pussy-fucker',
    usage: 'Highly vulgar term for a man.',
    safetyLevel: SafetyLevel.DO_NOT_USE,
    region: [Region.TARAKESWAR_HOOGHLY],
    culturalContext: 'Extremely vulgar sexual insult',
    examples: []
  },
  {
    word: 'Magmarani',
    banglaScript: 'মাগমারানি',
    meaning: 'Adulterer',
    usage: 'Man chasing other men\'s wives.',
    safetyLevel: SafetyLevel.DO_NOT_USE,
    region: [Region.TARAKESWAR_HOOGHLY],
    culturalContext: 'Vulgar term for inappropriate sexual behavior',
    examples: []
  },
  {
    word: 'Honder pola',
    banglaScript: 'হন্ডের পোলা',
    meaning: 'Son of a bitch',
    usage: 'Crude insult for someone\'s character.',
    safetyLevel: SafetyLevel.DO_NOT_USE,
    region: [Region.TARAKESWAR_HOOGHLY],
    culturalContext: 'Offensive character insult',
    examples: []
  },
  {
    word: 'Bara',
    banglaScript: 'বাড়',
    meaning: 'Penis',
    usage: 'Used as an exclamation of extreme frustration.',
    safetyLevel: SafetyLevel.DO_NOT_USE,
    region: [Region.TARAKESWAR_HOOGHLY],
    culturalContext: 'Vulgar anatomical reference used as curse word',
    examples: []
  },
  {
    word: 'Chudlingpong',
    banglaScript: 'চুদলিংপং',
    meaning: 'Clusterfuck',
    usage: 'Used when something goes very wrong or weirdly.',
    safetyLevel: SafetyLevel.DO_NOT_USE,
    region: [Region.TARAKESWAR_HOOGHLY],
    culturalContext: 'Vulgar expression for chaotic situations',
    examples: []
  },
  {
    word: 'Baba choda',
    banglaScript: 'বাবা চোদা',
    meaning: 'Father-fucker',
    usage: 'One of the heaviest, most offensive slurs.',
    safetyLevel: SafetyLevel.DO_NOT_USE,
    region: [Region.TARAKESWAR_HOOGHLY],
    culturalContext: 'Extremely offensive familial insult, causes severe social consequences',
    examples: []
  },
  {
    word: 'Boka choda',
    banglaScript: 'বোকা চোদা',
    meaning: 'Stupid fucker',
    usage: 'Someone who is foolish and useless.',
    safetyLevel: SafetyLevel.DO_NOT_USE,
    region: [Region.TARAKESWAR_HOOGHLY],
    culturalContext: 'Vulgar insult combining stupidity with sexual vulgarity',
    examples: []
  },
  {
    word: 'Layaura',
    banglaScript: 'লাউড়া',
    meaning: 'Frustration',
    usage: 'Said when a task fails and you are angry.',
    safetyLevel: SafetyLevel.DO_NOT_USE,
    region: [Region.TARAKESWAR_HOOGHLY],
    culturalContext: 'Vulgar expression of frustration',
    examples: []
  },
  {
    word: 'Gar',
    banglaScript: 'গাড়',
    meaning: 'Asshole',
    usage: 'Referring to the anatomy or an annoying person.',
    safetyLevel: SafetyLevel.DO_NOT_USE,
    region: [Region.TARAKESWAR_HOOGHLY],
    culturalContext: 'Vulgar anatomical reference used as insult',
    examples: []
  }
];