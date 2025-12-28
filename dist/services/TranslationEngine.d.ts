import { TranslationEngine as ITranslationEngine } from '../interfaces';
import { SlangTerm, RegionalContext, TranslationResult, SafetyAssessment, FormattedResponse } from '../types';
import { LexiconService } from './LexiconService';
import { SafetyValidator } from './SafetyValidator';
import { RegionalAdapter } from './RegionalAdapter';
export declare class TranslationEngine implements ITranslationEngine {
    private lexiconService;
    private safetyValidator;
    private regionalAdapter;
    constructor(lexiconService?: LexiconService, safetyValidator?: SafetyValidator, regionalAdapter?: RegionalAdapter);
    /**
     * Main translation method - processes input and returns complete result
     */
    translateTerm(input: string, context?: RegionalContext): TranslationResult;
    /**
     * Validate safety of a term
     */
    validateSafety(term: SlangTerm): SafetyAssessment;
    /**
     * Format the complete response
     */
    formatResponse(result: TranslationResult): FormattedResponse;
    /**
     * Build the formatted response string
     */
    private buildFormattedResponse;
    /**
     * Create result for unknown terms (Property 4: Unknown Term Handling)
     */
    private createUnknownTermResult;
    /**
     * Create result for Bhaiya correction (Property 10: Bhaiya Correction Protocol)
     */
    private createBhaiyaCorrectionResult;
    /**
     * Create result for empty input
     */
    private createEmptyResult;
    /**
     * Generate cultural notes for a term
     */
    private generateCulturalNotes;
    /**
     * Generate personality elements for response
     */
    private generatePersonalityElements;
}
//# sourceMappingURL=TranslationEngine.d.ts.map