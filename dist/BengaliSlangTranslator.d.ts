import { TranslationResult, Region } from './types';
export declare class BengaliSlangTranslator {
    private translationEngine;
    private lexiconService;
    private safetyValidator;
    private regionalAdapter;
    constructor();
    /**
     * Main translation method - translate a term with optional regional context
     */
    translate(input: string, region?: Region): TranslationResult;
    /**
     * Translate with Kolkata context
     */
    translateKolkata(input: string): TranslationResult;
    /**
     * Translate with Bardhaman context
     */
    translateBardhaman(input: string): TranslationResult;
    /**
     * Translate with Tarakeswar/Hooghly context
     */
    translateTarakeswar(input: string): TranslationResult;
    /**
     * Get formatted response string (for simple usage)
     */
    getFormattedResponse(input: string, region?: Region): string;
    /**
     * Check if a term exists in the lexicon
     */
    termExists(term: string): boolean;
    /**
     * Get all terms for a specific region
     */
    getRegionalTerms(region: Region): string[];
    /**
     * Search terms by meaning
     */
    searchByMeaning(query: string): string[];
    /**
     * Get a random term for exploration
     */
    getRandomTerm(): string | null;
    /**
     * Get safe terms only (for learning/examples)
     */
    getSafeTerms(): string[];
    /**
     * Interactive CLI method for testing
     */
    interactiveMode(): Promise<void>;
    /**
     * Process a command (for CLI interface)
     */
    processCommand(command: string): string;
    /**
     * Create regional context for a region
     */
    private createRegionalContext;
    /**
     * Get tone style for region
     */
    private getToneStyleForRegion;
    /**
     * Get safety threshold for region
     */
    private getSafetyThresholdForRegion;
    /**
     * Parse region from string
     */
    private parseRegion;
    /**
     * Create error result for exceptions
     */
    private createErrorResult;
    /**
     * Get help text for CLI
     */
    private getHelpText;
}
//# sourceMappingURL=BengaliSlangTranslator.d.ts.map