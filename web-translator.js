// Web interface for Bengali Slang Translator
// This is a client-side implementation using the same lexicon data

// Complete Bengali Slang Lexicon from the full database
const bengaliLexicon = {
    // Kolkata Urban Hub (The "Lyadh" Zone)
    'lyadh': {
        bengali: 'ল্যাদ',
        meaning: 'Proactive Laziness. A lifestyle choice; enjoying doing nothing.',
        culturalContext: 'Core concept of Kolkata urban culture, represents the art of productive relaxation',
        examples: 'Aj puro din lyadh korbo, Lyadh is a way of life in Kolkata',
        safetyLevel: 'Safe / Friendly',
        regions: ['kolkata'],
        category: 'lifestyle'
    },
    'aantel': {
        bengali: 'আঁতেল',
        meaning: 'Pseudo-intellectual. Someone acting too smart at a tea stall.',
        culturalContext: 'Used to describe someone showing off their knowledge inappropriately',
        examples: 'Oi aantel ta ki bolche, Aantel hoye kaj nei',
        safetyLevel: 'Friendly Roast',
        regions: ['kolkata'],
        category: 'personality'
    },
    'chap': {
        bengali: 'চাপ',
        meaning: 'Stress/Pressure. Used when things are difficult or busy.',
        culturalContext: 'Common expression for stress in daily life',
        examples: 'Khub chap ache, Chap niye kaj korchi',
        safetyLevel: 'Safe / Friendly',
        regions: ['kolkata'],
        category: 'emotion'
    },
    'kelane': {
        bengali: 'ক্যালানে',
        meaning: 'Silly/Grinning. Someone smiling foolishly like a joker.',
        culturalContext: 'Offensive term that can be hurtful when used to describe someone',
        examples: '',
        safetyLevel: 'Do not use',
        regions: ['kolkata'],
        category: 'negative',
        warning: 'This term can be offensive and may lead to social conflicts. Use only for academic understanding.'
    },
    'fatafati': {
        bengali: 'ফাটাফাটি',
        meaning: 'Awesome. The ultimate compliment for anything good.',
        culturalContext: 'Popular positive expression used widely in Bengali culture',
        examples: 'Fatafati khawa hoyeche, Eta fatafati lagche',
        safetyLevel: 'Safe / Friendly',
        regions: ['kolkata'],
        category: 'positive'
    },
    'poka': {
        bengali: 'পোকা',
        meaning: 'Obsession. A "buff" (e.g., Movie-poka, Boi-poka).',
        culturalContext: 'Endearing term for someone passionate about something',
        examples: 'Tui to cinema poka, Boi poka hoye gechi',
        safetyLevel: 'Safe / Friendly',
        regions: ['kolkata'],
        category: 'personality'
    },

    // Bardhaman Belt (Rarh Banga & Rural Nuances)
    'situa': {
        bengali: 'সিতুয়া',
        meaning: 'Damp/Chilly. Unique to this region. Used for weather or damp clothes.',
        culturalContext: 'Regional weather term specific to Bardhaman area',
        examples: 'Aj situa lagche, Kapor gulo situa hoye geche',
        safetyLevel: 'Safe / Friendly',
        regions: ['bardhaman'],
        category: 'weather'
    },
    'bari-ghora': {
        bengali: 'বাড়ি-ঘোড়া',
        meaning: 'Showing off. Acting like a rich landlord (Zamindar style).',
        culturalContext: 'References the historical zamindar culture of rural Bengal',
        examples: 'Bari-ghora korche keno, Zamindar er moto bari-ghora',
        safetyLevel: 'Friendly Roast',
        regions: ['bardhaman'],
        category: 'behavior'
    },
    'pod paka': {
        bengali: 'পোদ পাকা',
        meaning: 'Precocious/Spoiled. Someone acting too mature/wicked for their age.',
        culturalContext: 'Used to describe children who act beyond their years',
        examples: 'Chele ta pod paka, Pod paka hoye geche',
        safetyLevel: 'Safe / Friendly',
        regions: ['bardhaman'],
        category: 'personality'
    },
    'mayya': {
        bengali: 'মাইয়া',
        meaning: 'Girl. Regional dialect for "Meye."',
        culturalContext: 'Rural dialect variation of the standard Bengali word for girl',
        examples: 'Oi mayya ta ke, Mayya gulo elo',
        safetyLevel: 'Friendly Roast',
        regions: ['bardhaman'],
        category: 'people'
    },
    'pet hoyeche': {
        bengali: 'পেট হয়েছে',
        meaning: 'Pregnant. A very blunt, non-medical way to say someone is pregnant.',
        culturalContext: 'Crude way to refer to pregnancy, can be offensive',
        examples: '',
        safetyLevel: 'Offensive / Annoying',
        regions: ['bardhaman'],
        category: 'crude',
        warning: 'This is a crude way to refer to pregnancy and can be offensive.'
    },
    'poati': {
        bengali: 'পোয়াতি',
        meaning: 'Pregnant woman. Traditional/Rural term for a pregnant lady.',
        culturalContext: 'Outdated and potentially offensive term for pregnant women',
        examples: '',
        safetyLevel: 'Do not use',
        regions: ['bardhaman'],
        category: 'offensive',
        warning: 'This is an outdated and potentially offensive term for pregnant women.'
    },
    'mag-bhatar': {
        bengali: 'মাগ-ভাতার',
        meaning: 'Wife & Husband. Very crude/low-class way to refer to a married couple.',
        culturalContext: 'Highly disrespectful way to refer to married couples',
        examples: '',
        safetyLevel: 'Do not use',
        regions: ['bardhaman'],
        category: 'vulgar',
        warning: 'Highly disrespectful way to refer to married couples.'
    },
    'maagi': {
        bengali: 'মাগি',
        meaning: 'Girl/Woman. Historically meant woman, now a heavy sexual slur.',
        culturalContext: 'Extremely offensive sexual slur, never appropriate to use',
        examples: '',
        safetyLevel: 'Do not use',
        regions: ['bardhaman'],
        category: 'vulgar',
        warning: 'Extremely offensive sexual slur, never appropriate to use.'
    },
    'maagibaji': {
        bengali: 'মাগিবাড়ি',
        meaning: 'Womanizing. Running around chasing women for sex.',
        culturalContext: 'Vulgar term for inappropriate sexual behavior',
        examples: '',
        safetyLevel: 'Do not use',
        regions: ['bardhaman'],
        category: 'vulgar',
        warning: 'Vulgar term for inappropriate sexual behavior.'
    },
    'nang korta jawa': {
        bengali: 'নাঙ করতে যাওয়া',
        meaning: 'Infidelity. Going to bed with someone other than a spouse.',
        culturalContext: 'Crude reference to extramarital affairs',
        examples: '',
        safetyLevel: 'Do not use',
        regions: ['bardhaman'],
        category: 'vulgar',
        warning: 'Crude reference to extramarital affairs.'
    },
    'barobhatari': {
        bengali: 'বারোভাতারী',
        meaning: 'Slut. Highly offensive term for a woman with many partners.',
        culturalContext: 'Extremely derogatory term for women, never acceptable',
        examples: '',
        safetyLevel: 'Do not use',
        regions: ['bardhaman'],
        category: 'vulgar',
        warning: 'Extremely derogatory term for women, never acceptable.'
    },

    // Tarakeswar & Hooghly Corridor (Deep Slang & Temple Town)
    'toto-giri': {
        bengali: 'টোটো-গিরি',
        meaning: 'E-Rickshaw roaming. Wasting time traveling aimlessly in a Toto.',
        culturalContext: 'Modern term referring to the popular e-rickshaw transport',
        examples: 'Toto-giri korchi, Puro din toto-giri',
        safetyLevel: 'Safe / Friendly',
        regions: ['tarakeswar', 'hooghly'],
        category: 'activity'
    },
    'jatri': {
        bengali: 'যাত্রী',
        meaning: 'Pilgrim. Refers to the massive Shiva temple crowds.',
        culturalContext: 'Religious context specific to temple towns like Tarakeswar',
        examples: 'Jatri ra elo, Tarakeswar e jatri der bhir',
        safetyLevel: 'Safe / Friendly',
        regions: ['tarakeswar', 'hooghly'],
        category: 'religious'
    },
    'naite jabo': {
        bengali: 'নাইতে যাব',
        meaning: 'Bathing. Local way of saying "I am going to bathe."',
        culturalContext: 'Regional dialect for bathing, common in rural areas',
        examples: 'Naite jabo ekhon, Naite gelo',
        safetyLevel: 'Safe / Friendly',
        regions: ['tarakeswar', 'hooghly'],
        category: 'daily-life'
    },
    'gar': {
        bengali: 'গাড়',
        meaning: 'Asshole. Referring to the anatomy or an annoying person.',
        culturalContext: 'Vulgar anatomical reference used as insult',
        examples: '',
        safetyLevel: 'Do not use',
        regions: ['tarakeswar', 'hooghly'],
        category: 'vulgar',
        warning: 'Vulgar anatomical reference used as insult.'
    },
    'khankir chala': {
        bengali: 'খানকির ছেলে',
        meaning: 'Son of a whore. Extremely offensive insult used in heated fights.',
        culturalContext: 'Extremely vulgar insult, causes serious social offense',
        examples: '',
        safetyLevel: 'Do not use',
        regions: ['tarakeswar', 'hooghly'],
        category: 'vulgar',
        warning: 'Extremely vulgar insult, causes serious social offense.'
    },
    'sodanir pola': {
        bengali: 'সোদানির পোলা',
        meaning: 'Son of a fucker. Heavy regional insult, very vulgar.',
        culturalContext: 'Highly offensive regional curse word',
        examples: '',
        safetyLevel: 'Do not use',
        regions: ['tarakeswar', 'hooghly'],
        category: 'vulgar',
        warning: 'Highly offensive regional curse word.'
    },
    'khanki chudi': {
        bengali: 'খানকি চুদি',
        meaning: 'Sexual Slur. Highly offensive sexual slur toward women.',
        culturalContext: 'Extremely vulgar sexual slur, never appropriate',
        examples: '',
        safetyLevel: 'Do not use',
        regions: ['tarakeswar', 'hooghly'],
        category: 'vulgar',
        warning: 'Extremely vulgar sexual slur, never appropriate.'
    },
    'chutmarani': {
        bengali: 'চুতমারানি',
        meaning: 'Pussy-fucker. Highly vulgar term for a man.',
        culturalContext: 'Extremely vulgar sexual insult',
        examples: '',
        safetyLevel: 'Do not use',
        regions: ['tarakeswar', 'hooghly'],
        category: 'vulgar',
        warning: 'Extremely vulgar sexual insult.'
    },
    'magmarani': {
        bengali: 'মাগমারানি',
        meaning: 'Adulterer. Man chasing other men\'s wives.',
        culturalContext: 'Vulgar term for inappropriate sexual behavior',
        examples: '',
        safetyLevel: 'Do not use',
        regions: ['tarakeswar', 'hooghly'],
        category: 'vulgar',
        warning: 'Vulgar term for inappropriate sexual behavior.'
    },
    'honder pola': {
        bengali: 'হন্ডের পোলা',
        meaning: 'Son of a bitch. Crude insult for someone\'s character.',
        culturalContext: 'Offensive character insult',
        examples: '',
        safetyLevel: 'Do not use',
        regions: ['tarakeswar', 'hooghly'],
        category: 'vulgar',
        warning: 'Offensive character insult.'
    },
    'bara': {
        bengali: 'বাড়',
        meaning: 'Penis. Used as an exclamation of extreme frustration.',
        culturalContext: 'Vulgar anatomical reference used as curse word',
        examples: '',
        safetyLevel: 'Do not use',
        regions: ['tarakeswar', 'hooghly'],
        category: 'vulgar',
        warning: 'Vulgar anatomical reference used as curse word.'
    },
    'chudlingpong': {
        bengali: 'চুদলিংপং',
        meaning: 'Clusterfuck. Used when something goes very wrong or weirdly.',
        culturalContext: 'Vulgar expression for chaotic situations',
        examples: '',
        safetyLevel: 'Do not use',
        regions: ['tarakeswar', 'hooghly'],
        category: 'vulgar',
        warning: 'Vulgar expression for chaotic situations.'
    },
    'baba choda': {
        bengali: 'বাবা চোদা',
        meaning: 'Father-fucker. One of the heaviest, most offensive slurs.',
        culturalContext: 'Extremely offensive familial insult, causes severe social consequences',
        examples: '',
        safetyLevel: 'Do not use',
        regions: ['tarakeswar', 'hooghly'],
        category: 'vulgar',
        warning: 'Extremely offensive familial insult, causes severe social consequences.'
    },
    'boka choda': {
        bengali: 'বোকা চোদা',
        meaning: 'Stupid fucker. Someone who is foolish and useless.',
        culturalContext: 'Vulgar insult combining stupidity with sexual vulgarity',
        examples: '',
        safetyLevel: 'Do not use',
        regions: ['tarakeswar', 'hooghly'],
        category: 'vulgar',
        warning: 'Vulgar insult combining stupidity with sexual vulgarity.'
    },
    'layaura': {
        bengali: 'লাউড়া',
        meaning: 'Frustration. Said when a task fails and you are angry.',
        culturalContext: 'Vulgar expression of frustration',
        examples: '',
        safetyLevel: 'Do not use',
        regions: ['tarakeswar', 'hooghly'],
        category: 'vulgar',
        warning: 'Vulgar expression of frustration.'
    },

    // Additional common terms
    'adda': {
        bengali: 'আড্ডা',
        meaning: 'Informal chatting/hanging out. The art of casual conversation.',
        culturalContext: 'Quintessential Bengali social activity, especially popular in Kolkata',
        examples: 'Aj adda marte jabo, Adda is the soul of Bengali culture',
        safetyLevel: 'Safe / Friendly',
        regions: ['kolkata', 'bardhaman'],
        category: 'social'
    },
    'jhol': {
        bengali: 'ঝোল',
        meaning: 'Mess/Confusion. A complicated or messy situation.',
        culturalContext: 'Common term used to describe chaotic situations',
        examples: 'Eto jhol keno, Jhol ta solve koro',
        safetyLevel: 'Safe / Friendly',
        regions: ['kolkata', 'bardhaman', 'hooghly'],
        category: 'situation'
    },
    'dada': {
        bengali: 'দাদা',
        meaning: 'Elder brother/Respectful address for men. Term of respect and familiarity.',
        culturalContext: 'Universal Bengali term of respect, essential for social interaction',
        examples: 'Dada, ki khobor, Dada ke jiggesh koro',
        safetyLevel: 'Safe / Friendly',
        regions: ['kolkata', 'bardhaman', 'tarakeswar', 'hooghly'],
        category: 'respectful'
    },
    'mishti': {
        bengali: 'মিষ্টি',
        meaning: 'Sweet/Cute. Used to describe something pleasant or endearing.',
        culturalContext: 'Popular term especially in Bardhaman, known for sweets like Mihidana',
        examples: 'Mishti meye, Mishti kotha',
        safetyLevel: 'Safe / Friendly',
        regions: ['bardhaman', 'kolkata'],
        category: 'positive'
    },
    'bhalo': {
        bengali: 'ভালো',
        meaning: 'Good/Nice. General positive expression.',
        culturalContext: 'Universal Bengali word, foundation of polite conversation',
        examples: 'Bhalo lagche, Bhalo kotha',
        safetyLevel: 'Safe / Friendly',
        regions: ['kolkata', 'bardhaman', 'tarakeswar', 'hooghly'],
        category: 'positive'
    }
};

// Regional personality traits
const regionalPersonalities = {
    kolkata: {
        greeting: "Dada",
        tone: "witty and relaxed",
        culturalNote: "Kolkata's lyadh and adda culture"
    },
    bardhaman: {
        greeting: "Dada",
        tone: "earthy but respectful",
        culturalNote: "Land of Mihidana and Sitabhog"
    },
    tarakeswar: {
        greeting: "Dada",
        tone: "extra-cautious and respectful",
        culturalNote: "Sacred temple town atmosphere"
    },
    hooghly: {
        greeting: "Dada",
        tone: "extra-cautious and respectful", 
        culturalNote: "Historic and spiritual significance"
    }
};

class WebBengaliTranslator {
    constructor() {
        this.lexicon = bengaliLexicon;
        this.personalities = regionalPersonalities;
    }

    translate(term, region = 'kolkata') {
        const cleanTerm = term.toLowerCase().trim();
        
        // Handle bhaiya correction
        if (cleanTerm.includes('bhaiya')) {
            return this.createBhaiyaCorrection();
        }

        // Find the term
        const entry = this.lexicon[cleanTerm];
        
        if (!entry) {
            return this.createUnknownTermResponse(term, region);
        }

        return this.createTranslationResponse(entry, region, cleanTerm);
    }

    createTranslationResponse(entry, region, term) {
        const personality = this.personalities[region];
        const greeting = personality.greeting;
        
        let response = `**${entry.bengali}**\n\n`;
        
        // Add safety warning for dangerous terms
        if (entry.safetyLevel === 'Do not use') {
            response += `${greeting}/Didi, be careful! This is a heavy slang. Do not use this in public.\n`;
            response += `"${this.capitalizeFirst(term)}" means **${entry.meaning}**\n`;
            if (entry.warning) {
                response += `**Warning:** ${entry.warning}\n`;
            }
        } else {
            response += `${greeting}, "${this.capitalizeFirst(term)}" means **${entry.meaning}**\n`;
        }
        
        response += `**Cultural Context:** ${entry.culturalContext}\n`;
        response += `**Examples:** ${entry.examples}\n\n`;
        response += `**Safety Level:** ${entry.safetyLevel}`;

        return {
            formattedResponse: response,
            safetyLevel: entry.safetyLevel,
            term: term,
            meaning: entry.meaning,
            bengali: entry.bengali
        };
    }

    createBhaiyaCorrection() {
        return {
            formattedResponse: `Dada, in Bengal we say "Dada" not "Bhaiya"! 😊\n\n**দাদা**\n\nDada means **Elder brother/Respectful address for men**. Term of respect and familiarity.\n**Cultural Context:** Universal Bengali term of respect, essential for social interaction\n**Examples:** Dada, ki khobor, Dada ke jiggesh koro\n\n**Safety Level:** Safe / Friendly`,
            safetyLevel: 'Safe / Friendly',
            term: 'dada',
            meaning: 'Elder brother/Respectful address for men',
            bengali: 'দাদা'
        };
    }

    createUnknownTermResponse(term, region) {
        const personality = this.personalities[region];
        return {
            formattedResponse: `${personality.greeting}, I don't know "${term}" yet. I'm still learning Bengali slang!\n\nTry these popular terms: lyadh, fatafati, adda, jhol, mishti, bhalo`,
            safetyLevel: 'Unknown',
            term: term,
            meaning: 'Unknown term',
            bengali: '?'
        };
    }

    searchByMeaning(searchTerm) {
        const results = [];
        const search = searchTerm.toLowerCase();
        
        for (const [term, entry] of Object.entries(this.lexicon)) {
            if (entry.meaning.toLowerCase().includes(search) || 
                entry.culturalContext.toLowerCase().includes(search) ||
                entry.examples.toLowerCase().includes(search)) {
                results.push({
                    term: term,
                    ...this.createTranslationResponse(entry, 'kolkata', term)
                });
            }
        }
        
        return results;
    }

    getRandomTerm() {
        const terms = Object.keys(this.lexicon);
        const randomTerm = terms[Math.floor(Math.random() * terms.length)];
        return this.translate(randomTerm);
    }

    getSafeTerms() {
        const safeTerms = [];
        for (const [term, entry] of Object.entries(this.lexicon)) {
            if (entry.safetyLevel === 'Safe / Friendly') {
                safeTerms.push({
                    term: term,
                    meaning: entry.meaning,
                    bengali: entry.bengali
                });
            }
        }
        return safeTerms;
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// Initialize translator
const webTranslator = new WebBengaliTranslator();

// Web interface functions
function showResult(result) {
    const resultSection = document.getElementById('resultSection');
    
    let safetyClass = 'safe';
    if (result.safetyLevel === 'Do not use') {
        safetyClass = 'warning';
    } else if (result.safetyLevel === 'Caution advised') {
        safetyClass = 'warning';
    }
    
    let safetyLabelClass = 'safety-safe';
    if (result.safetyLevel === 'Do not use' || result.safetyLevel === 'Caution advised') {
        safetyLabelClass = 'safety-warning';
    }
    
    const formattedText = result.formattedResponse
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');
    
    resultSection.innerHTML = `
        <div class="result-card ${safetyClass}">
            <div class="bengali-text">${result.bengali}</div>
            <div class="meaning">${formattedText}</div>
            <span class="safety-label ${safetyLabelClass}">${result.safetyLevel}</span>
        </div>
    `;
}

function showMultipleResults(results, title) {
    const resultSection = document.getElementById('resultSection');
    
    let html = `<h3>${title}</h3>`;
    
    results.forEach((result, index) => {
        let safetyClass = 'safe';
        if (result.safetyLevel === 'Do not use') {
            safetyClass = 'warning';
        }
        
        const formattedText = result.formattedResponse
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
        
        html += `
            <div class="result-card ${safetyClass}">
                <div class="bengali-text">${result.bengali}</div>
                <div class="meaning">${formattedText}</div>
            </div>
        `;
    });
    
    resultSection.innerHTML = html;
}

function showLoading() {
    const resultSection = document.getElementById('resultSection');
    resultSection.innerHTML = '<div class="loading">🔍 Searching Bengali slang database...</div>';
}

function translateTerm() {
    const input = document.getElementById('slangInput');
    const region = document.getElementById('regionSelect').value;
    const term = input.value.trim();
    
    if (!term) {
        alert('Dada, please enter a Bengali slang term!');
        return;
    }
    
    showLoading();
    
    // Simulate slight delay for better UX
    setTimeout(() => {
        const result = webTranslator.translate(term, region);
        showResult(result);
    }, 300);
}

function quickTranslate(term) {
    const region = document.getElementById('regionSelect').value;
    document.getElementById('slangInput').value = term;
    
    showLoading();
    setTimeout(() => {
        const result = webTranslator.translate(term, region);
        showResult(result);
    }, 300);
}

function getRandomTerm() {
    showLoading();
    setTimeout(() => {
        const result = webTranslator.getRandomTerm();
        showResult(result);
        document.getElementById('slangInput').value = result.term;
    }, 300);
}

function showSafeTerms() {
    showLoading();
    setTimeout(() => {
        const safeTerms = webTranslator.getSafeTerms();
        const resultSection = document.getElementById('resultSection');
        
        let html = '<h3>🛡️ Safe Bengali Slang Terms for Learning</h3>';
        html += '<div class="result-card safe">';
        html += '<p>These terms are safe to use in casual conversations:</p><br>';
        
        safeTerms.forEach((term, index) => {
            html += `<strong>${index + 1}. ${term.bengali} (${term.term})</strong> - ${term.meaning}<br><br>`;
        });
        
        html += '</div>';
        resultSection.innerHTML = html;
    }, 300);
}

function searchByMeaning() {
    const searchTerm = prompt('Enter an English word to search for (e.g., "lazy", "good", "chat"):');
    
    if (!searchTerm || !searchTerm.trim()) {
        return;
    }
    
    showLoading();
    setTimeout(() => {
        const results = webTranslator.searchByMeaning(searchTerm.trim());
        
        if (results.length === 0) {
            const resultSection = document.getElementById('resultSection');
            resultSection.innerHTML = `
                <div class="result-card">
                    <h3>No results found</h3>
                    <p>No Bengali slang terms found matching "${searchTerm}". Try terms like: lazy, good, chat, sweet, cool</p>
                </div>
            `;
        } else {
            showMultipleResults(results, `🔍 Found ${results.length} term(s) matching "${searchTerm}"`);
        }
    }, 300);
}