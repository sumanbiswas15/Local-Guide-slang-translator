"use strict";
// SafetyValidator - Enforces content safety protocols and warning systems
Object.defineProperty(exports, "__esModule", { value: true });
exports.SafetyValidator = void 0;
const types_1 = require("../types");
class SafetyValidator {
    /**
     * Assess the safety level of a term
     */
    assessSafetyLevel(term) {
        return term.safetyLevel;
    }
    /**
     * Generate appropriate warning for a term based on its safety level
     */
    generateWarning(term) {
        const level = term.safetyLevel;
        switch (level) {
            case types_1.SafetyLevel.DO_NOT_USE:
                return {
                    level,
                    warningText: "Dada/Didi, be careful! This is a heavy slang. Do not use this in public.",
                    socialConsequences: [
                        "Can cause serious offense and social embarrassment",
                        "May damage relationships and reputation",
                        "Could lead to confrontation or conflict",
                        "Inappropriate in all social and professional settings",
                        "May be considered harassment or abuse"
                    ],
                    academicExplanation: `The term "${term.word}" (${term.banglaScript}) is ${term.meaning.toLowerCase()}. ${term.usage} This term is considered highly offensive in Bengali culture and should never be used in conversation.`,
                    recommendedAction: "Avoid using this term completely. Learn respectful alternatives for communication."
                };
            case types_1.SafetyLevel.OFFENSIVE_ANNOYING:
                return {
                    level,
                    warningText: "Dada/Didi, this word can be offensive. Use with caution.",
                    socialConsequences: [
                        "May cause discomfort or offense to others",
                        "Not appropriate in formal or respectful conversations",
                        "Could be misunderstood or taken negatively",
                        "Better to avoid in mixed company"
                    ],
                    academicExplanation: `The term "${term.word}" (${term.banglaScript}) means ${term.meaning.toLowerCase()}. ${term.usage} While not the most offensive, it can still cause discomfort.`,
                    recommendedAction: "Use only in very informal settings with close friends who understand the context."
                };
            case types_1.SafetyLevel.FRIENDLY_ROAST:
                return {
                    level,
                    warningText: "This is playful teasing language - use with friends who understand the joke!",
                    socialConsequences: [
                        "Generally harmless among friends",
                        "Could be misunderstood by strangers",
                        "Context and relationship matter a lot",
                        "Best used in casual, friendly settings"
                    ],
                    academicExplanation: `The term "${term.word}" (${term.banglaScript}) means ${term.meaning.toLowerCase()}. ${term.usage} It's typically used for friendly banter.`,
                    recommendedAction: "Safe to use with friends, but be mindful of your audience and their comfort level."
                };
            case types_1.SafetyLevel.SAFE_FRIENDLY:
            default:
                return {
                    level,
                    warningText: "This is safe and friendly language!",
                    socialConsequences: [
                        "No negative social consequences",
                        "Appropriate in most social settings",
                        "Helps you sound more local and authentic",
                        "Generally well-received by Bengali speakers"
                    ],
                    academicExplanation: `The term "${term.word}" (${term.banglaScript}) means ${term.meaning.toLowerCase()}. ${term.usage} This is a commonly accepted expression in Bengali culture.`,
                    recommendedAction: "Feel free to use this term - it will help you connect with local Bengali culture!"
                };
        }
    }
    /**
     * Determine if content should be blocked based on safety level
     */
    shouldBlockContent(safetyLevel) {
        // We don't block content, but we provide strong warnings for dangerous content
        // This allows for academic discussion while emphasizing safety
        return false;
    }
    /**
     * Check if a term requires a safety warning
     */
    requiresWarning(term) {
        return term.safetyLevel === types_1.SafetyLevel.DO_NOT_USE ||
            term.safetyLevel === types_1.SafetyLevel.OFFENSIVE_ANNOYING;
    }
    /**
     * Get the warning text for dangerous terms (used in responses)
     */
    getWarningText(term) {
        if (term.safetyLevel === types_1.SafetyLevel.DO_NOT_USE) {
            return "Dada/Didi, be careful! This is a heavy slang. Do not use this in public.";
        }
        else if (term.safetyLevel === types_1.SafetyLevel.OFFENSIVE_ANNOYING) {
            return "Dada/Didi, this word can be offensive. Use with caution.";
        }
        return "";
    }
    /**
     * Get social consequences for a term
     */
    getSocialConsequences(term) {
        const warning = this.generateWarning(term);
        return warning.socialConsequences;
    }
    /**
     * Check if term is safe for examples and usage demonstrations
     */
    isSafeForExamples(term) {
        return term.safetyLevel === types_1.SafetyLevel.SAFE_FRIENDLY ||
            term.safetyLevel === types_1.SafetyLevel.FRIENDLY_ROAST;
    }
    /**
     * Get appropriate tone for explaining a term based on safety level
     */
    getExplanationTone(term) {
        switch (term.safetyLevel) {
            case types_1.SafetyLevel.DO_NOT_USE:
                return 'academic'; // Academic tone for dangerous terms
            case types_1.SafetyLevel.OFFENSIVE_ANNOYING:
                return 'cautious';
            case types_1.SafetyLevel.FRIENDLY_ROAST:
                return 'friendly';
            case types_1.SafetyLevel.SAFE_FRIENDLY:
            default:
                return 'friendly';
        }
    }
}
exports.SafetyValidator = SafetyValidator;
//# sourceMappingURL=SafetyValidator.js.map