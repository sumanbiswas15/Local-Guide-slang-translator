import { SlangTerm, RegionalContext, TranslationResult, SafetyAssessment, FormattedResponse, SafetyWarning, CulturalContext, PersonalityTraits, Region, SafetyLevel } from '../types';
export interface TranslationEngine {
    translateTerm(input: string, context?: RegionalContext): TranslationResult;
    validateSafety(term: SlangTerm): SafetyAssessment;
    formatResponse(result: TranslationResult): FormattedResponse;
}
export interface RegionalAdapter {
    adaptTone(region: Region, baseResponse: string): string;
    getCulturalContext(region: Region, term: SlangTerm): CulturalContext;
    getPersonalityTraits(region: Region): PersonalityTraits;
}
export interface LexiconService {
    findTerm(query: string): SlangTerm | null;
    getTermsByRegion(region: Region): SlangTerm[];
    validateTermExists(term: string): boolean;
    getAllTerms(): SlangTerm[];
}
export interface SafetyValidator {
    assessSafetyLevel(term: SlangTerm): SafetyLevel;
    generateWarning(term: SlangTerm): SafetyWarning;
    shouldBlockContent(safetyLevel: SafetyLevel): boolean;
}
//# sourceMappingURL=index.d.ts.map