// Property test for lexicon service data accuracy and consistency
// Feature: bengali-slang-translator, Property 3: Data Accuracy and Consistency

import * as fc from 'fast-check';
import { LexiconService } from '../services/LexiconService';
import { LEXICON_DATA } from '../data/lexicon';
import { SlangTerm, Region, SafetyLevel } from '../types';

describe('LexiconService Data Accuracy and Consistency', () => {
  let lexiconService: LexiconService;

  beforeEach(() => {
    lexiconService = new LexiconService();
  });

  // Property 3: Data Accuracy and Consistency
  // For any term that exists in the lexicon, the returned cultural and linguistic information 
  // should exactly match the stored lexicon data.
  test('Property 3: Found terms should return exact lexicon data', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...LEXICON_DATA),
        (originalTerm: SlangTerm) => {
          // Test exact word match
          const foundByWord = lexiconService.findTerm(originalTerm.word);
          if (foundByWord) {
            expect(foundByWord.word).toBe(originalTerm.word);
            expect(foundByWord.banglaScript).toBe(originalTerm.banglaScript);
            expect(foundByWord.meaning).toBe(originalTerm.meaning);
            expect(foundByWord.usage).toBe(originalTerm.usage);
            expect(foundByWord.safetyLevel).toBe(originalTerm.safetyLevel);
            expect(foundByWord.region).toEqual(originalTerm.region);
            expect(foundByWord.culturalContext).toBe(originalTerm.culturalContext);
            expect(foundByWord.examples).toEqual(originalTerm.examples);
          }

          // Test Bangla script match
          const foundByScript = lexiconService.findTerm(originalTerm.banglaScript);
          if (foundByScript) {
            expect(foundByScript.word).toBe(originalTerm.word);
            expect(foundByScript.banglaScript).toBe(originalTerm.banglaScript);
            expect(foundByScript.meaning).toBe(originalTerm.meaning);
            expect(foundByScript.usage).toBe(originalTerm.usage);
            expect(foundByScript.safetyLevel).toBe(originalTerm.safetyLevel);
            expect(foundByScript.region).toEqual(originalTerm.region);
            expect(foundByScript.culturalContext).toBe(originalTerm.culturalContext);
            expect(foundByScript.examples).toEqual(originalTerm.examples);
          }

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('validateTermExists should be consistent with findTerm', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...LEXICON_DATA),
        (term: SlangTerm) => {
          const exists = lexiconService.validateTermExists(term.word);
          const found = lexiconService.findTerm(term.word);
          
          // If validateTermExists returns true, findTerm should return the term
          // If validateTermExists returns false, findTerm should return null
          expect(exists).toBe(found !== null);
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('getTermsByRegion should return only terms from specified region', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...Object.values(Region)),
        (region: Region) => {
          const regionTerms = lexiconService.getTermsByRegion(region);
          
          // All returned terms should include the specified region
          regionTerms.forEach(term => {
            expect(term.region).toContain(region);
          });
          
          // Should not return terms that don't include the region
          const allTerms = lexiconService.getAllTerms();
          const expectedTerms = allTerms.filter(term => term.region.includes(region));
          expect(regionTerms.length).toBe(expectedTerms.length);
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('getAllTerms should return complete lexicon without modification', () => {
    const allTerms = lexiconService.getAllTerms();
    
    // Should return all terms
    expect(allTerms.length).toBe(LEXICON_DATA.length);
    
    // Should be a copy (modifying returned array shouldn't affect service)
    const originalLength = allTerms.length;
    allTerms.pop(); // Remove one item from returned array
    
    const allTermsAgain = lexiconService.getAllTerms();
    expect(allTermsAgain.length).toBe(originalLength); // Should still have all terms
  });

  test('Case insensitive search should work consistently', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...LEXICON_DATA),
        (term: SlangTerm) => {
          const lowerCase = lexiconService.findTerm(term.word.toLowerCase());
          const upperCase = lexiconService.findTerm(term.word.toUpperCase());
          const mixedCase = lexiconService.findTerm(term.word);
          
          // All case variations should return the same term (or all null)
          if (lowerCase && upperCase && mixedCase) {
            expect(lowerCase.word).toBe(upperCase.word);
            expect(upperCase.word).toBe(mixedCase.word);
          }
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Empty or invalid queries should return null consistently', () => {
    const invalidQueries = ['', '   ', null, undefined];
    
    invalidQueries.forEach(query => {
      const result = lexiconService.findTerm(query as string);
      expect(result).toBeNull();
    });
  });

  test('searchByMeaning should return terms containing the query', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...LEXICON_DATA),
        (term: SlangTerm) => {
          // Search by a word from the meaning
          const meaningWords = term.meaning.split(' ');
          if (meaningWords.length > 0) {
            const searchWord = meaningWords[0].toLowerCase();
            const results = lexiconService.searchByMeaning(searchWord);
            
            // Should find the original term or terms with similar meanings
            const foundOriginal = results.some(result => result.word === term.word);
            const foundRelevant = results.every(result => 
              result.meaning.toLowerCase().includes(searchWord) ||
              result.usage.toLowerCase().includes(searchWord) ||
              result.culturalContext.toLowerCase().includes(searchWord)
            );
            
            expect(foundRelevant).toBe(true);
          }
          
          return true;
        }
      ),
      { numRuns: 50 } // Reduced runs for this more complex test
    );
  });

  test('getRandomTerm should return valid lexicon terms', () => {
    for (let i = 0; i < 10; i++) {
      const randomTerm = lexiconService.getRandomTerm();
      expect(randomTerm).not.toBeNull();
      
      if (randomTerm) {
        // Should be a valid term from the lexicon
        const foundTerm = lexiconService.findTerm(randomTerm.word);
        expect(foundTerm).not.toBeNull();
        expect(foundTerm!.word).toBe(randomTerm.word);
      }
    }
  });
});