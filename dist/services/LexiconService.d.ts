import { LexiconService as ILexiconService } from '../interfaces';
import { SlangTerm, Region } from '../types';
export declare class LexiconService implements ILexiconService {
    private lexicon;
    constructor(lexiconData?: SlangTerm[]);
    /**
     * Find a term by exact or fuzzy matching
     * Supports both English and Bangla script searches
     */
    findTerm(query: string): SlangTerm | null;
    /**
     * Get all terms associated with a specific region
     */
    getTermsByRegion(region: Region): SlangTerm[];
    /**
     * Validate if a term exists in the lexicon
     */
    validateTermExists(term: string): boolean;
    /**
     * Get all terms in the lexicon
     */
    getAllTerms(): SlangTerm[];
    /**
     * Get terms by safety level (useful for filtering)
     */
    getTermsBySafetyLevel(safetyLevel: string): SlangTerm[];
    /**
     * Search terms by partial meaning match
     */
    searchByMeaning(meaningQuery: string): SlangTerm[];
    /**
     * Get random term for testing/examples
     */
    getRandomTerm(): SlangTerm | null;
}
//# sourceMappingURL=LexiconService.d.ts.map