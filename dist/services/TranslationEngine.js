"use strict";
// TranslationEngine - Core component for processing queries and orchestrating responses
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationEngine = void 0;
const LexiconService_1 = require("./LexiconService");
const SafetyValidator_1 = require("./SafetyValidator");
const RegionalAdapter_1 = require("./RegionalAdapter");
class TranslationEngine {
    constructor(lexiconService, safetyValidator, regionalAdapter) {
        this.lexiconService = lexiconService || new LexiconService_1.LexiconService();
        this.safetyValidator = safetyValidator || new SafetyValidator_1.SafetyValidator();
        this.regionalAdapter = regionalAdapter || new RegionalAdapter_1.RegionalAdapter();
    }
    /**
     * Main translation method - processes input and returns complete result
     */
    translateTerm(input, context) {
        // Handle empty or invalid input
        if (!input || input.trim() === '') {
            return this.createEmptyResult('Dada, ki bolcho? Please tell me a word to explain!');
        }
        // Check for "Bhaiya" correction
        if (input.toLowerCase().includes('bhaiya')) {
            return this.createBhaiyaCorrectionResult(input, context);
        }
        // Find the term in lexicon
        const term = this.lexiconService.findTerm(input.trim());
        if (!term) {
            return this.createUnknownTermResult(input, context);
        }
        // Validate safety
        const safetyAssessment = this.validateSafety(term);
        // Create cultural notes and personality elements
        const culturalNotes = this.generateCulturalNotes(term, context);
        const personalityElements = this.generatePersonalityElements(term, context);
        return {
            term,
            formattedResponse: this.buildFormattedResponse(term, safetyAssessment, culturalNotes, context),
            safetyWarning: safetyAssessment.requiresWarning ? this.safetyValidator.generateWarning(term) : undefined,
            culturalNotes,
            personalityElements,
            isTermFound: true
        };
    }
    /**
     * Validate safety of a term
     */
    validateSafety(term) {
        const level = this.safetyValidator.assessSafetyLevel(term);
        const requiresWarning = this.safetyValidator.requiresWarning(term);
        return {
            level,
            requiresWarning,
            warningText: requiresWarning ? this.safetyValidator.getWarningText(term) : undefined,
            socialConsequences: this.safetyValidator.getSocialConsequences(term)
        };
    }
    /**
     * Format the complete response
     */
    formatResponse(result) {
        return {
            content: result.formattedResponse,
            safetyWarning: result.safetyWarning,
            culturalNotes: result.culturalNotes
        };
    }
    /**
     * Build the formatted response string
     */
    buildFormattedResponse(term, safetyAssessment, culturalNotes, context) {
        let response = '';
        // Start with Bangla script (Property 1: Bangla Script Priority)
        response += `**${term.banglaScript}**\n\n`;
        // Add safety warning if needed (Property 5: Safety Warning Protocol)
        if (safetyAssessment.requiresWarning && safetyAssessment.warningText) {
            response += `⚠️ ${safetyAssessment.warningText}\n\n`;
        }
        // Add addressing term (Property 9: Proper User Addressing)
        const addressing = context ?
            this.regionalAdapter.getRegionalAddressing(context.region) :
            'Dada';
        response += `${addressing}, `;
        // Add meaning and usage (Property 2: Complete Response Format)
        response += `"${term.word}" means **${term.meaning}**. `;
        response += `${term.usage}\n\n`;
        // Add cultural context (Property 12: Cultural Information Beyond Translation)
        response += `**Cultural Context:** ${term.culturalContext}\n\n`;
        // Add regional information if context provided (Property 8: Regional Information Inclusion)
        if (context) {
            const regionalContext = this.regionalAdapter.getCulturalContext(context.region, term);
            if (regionalContext.heuristics.length > 0) {
                response += `**Regional Notes:** ${regionalContext.heuristics.join(' ')}\n\n`;
            }
        }
        // Add usage examples for safe terms (Property 15: Authentic Examples and Context)
        if (this.safetyValidator.isSafeForExamples(term) && term.examples && term.examples.length > 0) {
            response += `**Examples:** ${term.examples.join(', ')}\n\n`;
        }
        // Add safety classification (Property 16: Safety Classification Visibility)
        response += `**Safety Level:** ${term.safetyLevel}`;
        // Apply regional tone adaptation
        if (context) {
            response = this.regionalAdapter.adaptTone(context.region, response);
        }
        return response.trim();
    }
    /**
     * Create result for unknown terms (Property 4: Unknown Term Handling)
     */
    createUnknownTermResult(input, context) {
        const addressing = context ?
            this.regionalAdapter.getRegionalAddressing(context.region) :
            'Dada';
        let response = `${addressing}, ami "${input}" ta jani na! `;
        response += `This word is not in my lexicon. `;
        response += `Maybe it's a very local term or I haven't learned it yet. `;
        response += `Try asking at your nearest cha-er dokan - they know all the local slang!`;
        // Apply regional tone if context provided
        if (context) {
            response = this.regionalAdapter.adaptTone(context.region, response);
        }
        return {
            term: null,
            formattedResponse: response,
            safetyWarning: undefined,
            culturalNotes: ['Unknown term - not found in verified lexicon'],
            personalityElements: [
                { type: 'addressing', content: addressing },
                { type: 'cultural_reference', content: 'cha-er dokan' }
            ],
            isTermFound: false
        };
    }
    /**
     * Create result for Bhaiya correction (Property 10: Bhaiya Correction Protocol)
     */
    createBhaiyaCorrectionResult(input, context) {
        const correctionText = 'Boss, ekhane \'Dada\' (দাদা) bolun, nahole lok e bhabbe apni tourist!';
        let response = correctionText;
        // Still try to process the actual term if there's more than just "bhaiya"
        const cleanInput = input.replace(/bhaiya/gi, '').trim();
        if (cleanInput) {
            const term = this.lexiconService.findTerm(cleanInput);
            if (term) {
                response += `\n\nNow, about "${cleanInput}":\n`;
                const safetyAssessment = this.validateSafety(term);
                const culturalNotes = this.generateCulturalNotes(term, context);
                response += this.buildFormattedResponse(term, safetyAssessment, culturalNotes, context);
                return {
                    term,
                    formattedResponse: response,
                    safetyWarning: safetyAssessment.requiresWarning ? this.safetyValidator.generateWarning(term) : undefined,
                    culturalNotes: ['Bhaiya correction provided', ...culturalNotes],
                    personalityElements: [
                        { type: 'addressing', content: 'Boss' },
                        { type: 'cultural_reference', content: 'Dada correction' }
                    ],
                    isTermFound: true
                };
            }
        }
        return {
            term: null,
            formattedResponse: response,
            safetyWarning: undefined,
            culturalNotes: ['Bhaiya correction provided'],
            personalityElements: [
                { type: 'addressing', content: 'Boss' },
                { type: 'cultural_reference', content: 'Dada correction' }
            ],
            isTermFound: false
        };
    }
    /**
     * Create result for empty input
     */
    createEmptyResult(message) {
        return {
            term: null,
            formattedResponse: message,
            safetyWarning: undefined,
            culturalNotes: ['Empty input provided'],
            personalityElements: [
                { type: 'addressing', content: 'Dada' }
            ],
            isTermFound: false
        };
    }
    /**
     * Generate cultural notes for a term
     */
    generateCulturalNotes(term, context) {
        const notes = [];
        // Add regional information
        if (term.region.length > 0) {
            notes.push(`Used in: ${term.region.join(', ')}`);
        }
        // Add safety information
        notes.push(`Safety level: ${term.safetyLevel}`);
        // Add regional context if provided
        if (context) {
            const regionalContext = this.regionalAdapter.getCulturalContext(context.region, term);
            if (regionalContext.references.length > 0) {
                notes.push(`Regional context: ${regionalContext.references[0]}`);
            }
        }
        return notes;
    }
    /**
     * Generate personality elements for response
     */
    generatePersonalityElements(term, context) {
        const elements = [];
        // Add addressing
        const addressing = context ?
            this.regionalAdapter.getRegionalAddressing(context.region) :
            'Dada';
        elements.push({ type: 'addressing', content: addressing });
        // Add cultural references based on region
        if (context) {
            const traits = this.regionalAdapter.getPersonalityTraits(context.region);
            if (traits.culturalReferences.length > 0) {
                const randomRef = traits.culturalReferences[Math.floor(Math.random() * traits.culturalReferences.length)];
                elements.push({
                    type: 'cultural_reference',
                    content: randomRef,
                    region: context.region
                });
            }
        }
        return elements;
    }
}
exports.TranslationEngine = TranslationEngine;
//# sourceMappingURL=TranslationEngine.js.map