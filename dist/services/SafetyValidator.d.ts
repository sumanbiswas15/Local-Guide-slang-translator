import { SafetyValidator as ISafetyValidator } from '../interfaces';
import { SlangTerm, SafetyLevel, SafetyWarning } from '../types';
export declare class SafetyValidator implements ISafetyValidator {
    /**
     * Assess the safety level of a term
     */
    assessSafetyLevel(term: SlangTerm): SafetyLevel;
    /**
     * Generate appropriate warning for a term based on its safety level
     */
    generateWarning(term: SlangTerm): SafetyWarning;
    /**
     * Determine if content should be blocked based on safety level
     */
    shouldBlockContent(safetyLevel: SafetyLevel): boolean;
    /**
     * Check if a term requires a safety warning
     */
    requiresWarning(term: SlangTerm): boolean;
    /**
     * Get the warning text for dangerous terms (used in responses)
     */
    getWarningText(term: SlangTerm): string;
    /**
     * Get social consequences for a term
     */
    getSocialConsequences(term: SlangTerm): string[];
    /**
     * Check if term is safe for examples and usage demonstrations
     */
    isSafeForExamples(term: SlangTerm): boolean;
    /**
     * Get appropriate tone for explaining a term based on safety level
     */
    getExplanationTone(term: SlangTerm): 'academic' | 'friendly' | 'cautious' | 'warning';
}
//# sourceMappingURL=SafetyValidator.d.ts.map