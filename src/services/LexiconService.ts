// LexiconService - Manages access to the cultural database and term retrieval

import { LexiconService as ILexiconService } from '../interfaces';
import { SlangTerm, Region } from '../types';
import { LEXICON_DATA } from '../data/lexicon';

export class LexiconService implements ILexiconService {
  private lexicon: SlangTerm[];

  constructor(lexiconData: SlangTerm[] = LEXICON_DATA) {
    this.lexicon = lexiconData;
  }

  /**
   * Find a term by exact or fuzzy matching
   * Supports both English and Bangla script searches
   */
  findTerm(query: string): SlangTerm | null {
    if (!query || query.trim() === '') {
      return null;
    }

    const normalizedQuery = query.trim().toLowerCase();

    // First try exact match on word
    let term = this.lexicon.find(t => 
      t.word.toLowerCase() === normalizedQuery
    );

    if (term) {
      return term;
    }

    // Try exact match on Bangla script
    term = this.lexicon.find(t => 
      t.banglaScript === query.trim()
    );

    if (term) {
      return term;
    }

    // Try fuzzy matching on word (contains)
    term = this.lexicon.find(t => 
      t.word.toLowerCase().includes(normalizedQuery) ||
      normalizedQuery.includes(t.word.toLowerCase())
    );

    if (term) {
      return term;
    }

    // Try partial matching on meaning
    term = this.lexicon.find(t => 
      t.meaning.toLowerCase().includes(normalizedQuery) ||
      normalizedQuery.includes(t.meaning.toLowerCase())
    );

    return term || null;
  }

  /**
   * Get all terms associated with a specific region
   */
  getTermsByRegion(region: Region): SlangTerm[] {
    return this.lexicon.filter(term => 
      term.region.includes(region)
    );
  }

  /**
   * Validate if a term exists in the lexicon
   */
  validateTermExists(term: string): boolean {
    return this.findTerm(term) !== null;
  }

  /**
   * Get all terms in the lexicon
   */
  getAllTerms(): SlangTerm[] {
    return [...this.lexicon]; // Return a copy to prevent external modification
  }

  /**
   * Get terms by safety level (useful for filtering)
   */
  getTermsBySafetyLevel(safetyLevel: string): SlangTerm[] {
    return this.lexicon.filter(term => 
      term.safetyLevel === safetyLevel
    );
  }

  /**
   * Search terms by partial meaning match
   */
  searchByMeaning(meaningQuery: string): SlangTerm[] {
    if (!meaningQuery || meaningQuery.trim() === '') {
      return [];
    }

    const normalizedQuery = meaningQuery.trim().toLowerCase();
    
    return this.lexicon.filter(term => 
      term.meaning.toLowerCase().includes(normalizedQuery) ||
      term.usage.toLowerCase().includes(normalizedQuery) ||
      term.culturalContext.toLowerCase().includes(normalizedQuery)
    );
  }

  /**
   * Get random term for testing/examples
   */
  getRandomTerm(): SlangTerm | null {
    if (this.lexicon.length === 0) {
      return null;
    }
    
    const randomIndex = Math.floor(Math.random() * this.lexicon.length);
    return this.lexicon[randomIndex];
  }
}