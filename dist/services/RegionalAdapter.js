"use strict";
// RegionalAdapter - Provides context-aware personality and cultural adaptation
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionalAdapter = void 0;
const types_1 = require("../types");
class RegionalAdapter {
    /**
     * Adapt tone based on region-specific personality
     */
    adaptTone(region, baseResponse) {
        const traits = this.getPersonalityTraits(region);
        const culturalMarkers = this.getRegionalMarkers(region);
        let adaptedResponse = baseResponse;
        // Add regional cultural markers
        if (culturalMarkers.length > 0) {
            const randomMarker = culturalMarkers[Math.floor(Math.random() * culturalMarkers.length)];
            adaptedResponse += ` ${randomMarker}`;
        }
        // Apply regional tone style
        switch (region) {
            case types_1.Region.KOLKATA:
                adaptedResponse = this.applyKolkataTone(adaptedResponse);
                break;
            case types_1.Region.BARDHAMAN:
                adaptedResponse = this.applyBardhamanTone(adaptedResponse);
                break;
            case types_1.Region.TARAKESWAR_HOOGHLY:
                adaptedResponse = this.applyTarakeswarTone(adaptedResponse);
                break;
        }
        return adaptedResponse;
    }
    /**
     * Get cultural context for a region and term
     */
    getCulturalContext(region, term) {
        const baseMarkers = this.getRegionalMarkers(region);
        const references = this.getRegionalReferences(region);
        const heuristics = this.getRegionalHeuristics(region, term);
        return {
            markers: baseMarkers,
            references: references,
            heuristics: heuristics
        };
    }
    /**
     * Get personality traits for a region
     */
    getPersonalityTraits(region) {
        const baseAddressing = ['Dada', 'Didi', 'Boss'];
        switch (region) {
            case types_1.Region.KOLKATA:
                return {
                    addressingTerms: [...baseAddressing, 'Bhai'],
                    culturalReferences: ['lyadh', 'adda', 'cha-er dokan', 'fatafati', 'aantel'],
                    toneMarkers: ['arre', 'ki bolcho', 'dekho', 'bujhecho']
                };
            case types_1.Region.BARDHAMAN:
                return {
                    addressingTerms: [...baseAddressing],
                    culturalReferences: ['Mihidana', 'Sitabhog', 'zamindar', 'rarh banga', 'situa'],
                    toneMarkers: ['dekho', 'bujho', 'arre bhai', 'ki korbo']
                };
            case types_1.Region.TARAKESWAR_HOOGHLY:
                return {
                    addressingTerms: [...baseAddressing],
                    culturalReferences: ['Tarakeswar temple', 'jatri', 'toto', 'Shiva', 'mandir'],
                    toneMarkers: ['dekho', 'bujho', 'arre', 'ki hobe']
                };
            default:
                return {
                    addressingTerms: baseAddressing,
                    culturalReferences: ['Bengali culture', 'Bangla'],
                    toneMarkers: ['dekho', 'bujho']
                };
        }
    }
    /**
     * Apply Kolkata-specific tone (light and witty)
     */
    applyKolkataTone(response) {
        const kolkataExpressions = [
            "Arre, ei to Kolkata style!",
            "Lyadh culture er part eta!",
            "Adda te use korte paro!",
            "Cha-er dokan e shunbe ei word ta!"
        ];
        if (Math.random() < 0.3) { // 30% chance to add Kolkata flavor
            const expression = kolkataExpressions[Math.floor(Math.random() * kolkataExpressions.length)];
            response += ` ${expression}`;
        }
        return response;
    }
    /**
     * Apply Bardhaman-specific tone (earthy but respectful)
     */
    applyBardhamanTone(response) {
        const bardhamanExpressions = [
            "Rarh Banga te ei rokom bole!",
            "Mihidana khete khete ei word shunbe!",
            "Sitabhog er moto mishti ei expression!",
            "Zamindar der amlei ei bhasha!"
        ];
        if (Math.random() < 0.3) { // 30% chance to add Bardhaman flavor
            const expression = bardhamanExpressions[Math.floor(Math.random() * bardhamanExpressions.length)];
            response += ` ${expression}`;
        }
        return response;
    }
    /**
     * Apply Tarakeswar/Hooghly-specific tone (extra cautious)
     */
    applyTarakeswarTone(response) {
        const tarakeswarExpressions = [
            "Temple town e ei rokom bole!",
            "Jatri der moddhe shunbe!",
            "Toto te boshey ei kotha!",
            "Mandir er kache ei bhasha!"
        ];
        if (Math.random() < 0.2) { // 20% chance (more cautious)
            const expression = tarakeswarExpressions[Math.floor(Math.random() * tarakeswarExpressions.length)];
            response += ` ${expression}`;
        }
        return response;
    }
    /**
     * Get regional cultural markers
     */
    getRegionalMarkers(region) {
        switch (region) {
            case types_1.Region.KOLKATA:
                return ['Lyadh culture', 'Adda', 'Cha-er dokan', 'Fatafati'];
            case types_1.Region.BARDHAMAN:
                return ['Mihidana', 'Sitabhog', 'Rarh Banga', 'Zamindar culture'];
            case types_1.Region.TARAKESWAR_HOOGHLY:
                return ['Tarakeswar temple', 'Jatri', 'Toto-giri', 'Temple town'];
            default:
                return ['Bengali culture'];
        }
    }
    /**
     * Get regional cultural references
     */
    getRegionalReferences(region) {
        switch (region) {
            case types_1.Region.KOLKATA:
                return [
                    'The heart of Bengali intellectual culture',
                    'Where adda and lyadh are art forms',
                    'Tea stalls are universities of life',
                    'Every corner has a story'
                ];
            case types_1.Region.BARDHAMAN:
                return [
                    'Famous for Mihidana and Sitabhog sweets',
                    'Rich zamindar heritage',
                    'Rural Bengal at its authentic best',
                    'Where tradition meets modernity'
                ];
            case types_1.Region.TARAKESWAR_HOOGHLY:
                return [
                    'Sacred temple town of Lord Shiva',
                    'Thousands of pilgrims visit daily',
                    'Spiritual center of Bengal',
                    'Where devotion meets daily life'
                ];
            default:
                return ['Rich Bengali cultural heritage'];
        }
    }
    /**
     * Get regional heuristics based on term and region
     */
    getRegionalHeuristics(region, term) {
        const heuristics = [];
        // Tea stall heuristic
        if (this.isTeaStallRelated(term.word) || this.isTeaStallRelated(term.usage)) {
            heuristics.push("Tea stalls (cha-er dokan) are the best places to learn more slang like this!");
        }
        // Regional specific heuristics
        switch (region) {
            case types_1.Region.KOLKATA:
                if (term.word.toLowerCase().includes('lyadh') || term.usage.toLowerCase().includes('lazy')) {
                    heuristics.push("This captures the essence of Kolkata's lyadh culture perfectly!");
                }
                if (term.word.toLowerCase().includes('aantel') || term.usage.toLowerCase().includes('intellectual')) {
                    heuristics.push("You'll hear this in every adda session in Kolkata!");
                }
                break;
            case types_1.Region.BARDHAMAN:
                heuristics.push("In Bardhaman, don't forget to try the famous Mihidana and Sitabhog!");
                if (term.usage.toLowerCase().includes('rural') || term.usage.toLowerCase().includes('traditional')) {
                    heuristics.push("This reflects the authentic rural culture of Rarh Banga!");
                }
                break;
            case types_1.Region.TARAKESWAR_HOOGHLY:
                if (term.word.toLowerCase().includes('jatri') || term.usage.toLowerCase().includes('pilgrim')) {
                    heuristics.push("Perfect for understanding the temple culture here!");
                }
                heuristics.push("Be extra respectful with language in this sacred temple town!");
                break;
        }
        return heuristics;
    }
    /**
     * Check if term is related to tea stalls
     */
    isTeaStallRelated(text) {
        const teaStallKeywords = ['tea', 'cha', 'stall', 'dokan', 'adda'];
        const lowerText = text.toLowerCase();
        return teaStallKeywords.some(keyword => lowerText.includes(keyword));
    }
    /**
     * Get appropriate addressing term for region
     */
    getRegionalAddressing(region) {
        const traits = this.getPersonalityTraits(region);
        const addressingTerms = traits.addressingTerms;
        return addressingTerms[Math.floor(Math.random() * addressingTerms.length)];
    }
    /**
     * Check if region requires extra caution
     */
    requiresExtraCaution(region) {
        return region === types_1.Region.TARAKESWAR_HOOGHLY;
    }
}
exports.RegionalAdapter = RegionalAdapter;
//# sourceMappingURL=RegionalAdapter.js.map