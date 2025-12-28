// Property test for lexicon term validation
// Feature: bengali-slang-translator, Property 14: Lexicon Term Validation

import * as fc from 'fast-check';
import { LEXICON_DATA } from '../data/lexicon';
import { SlangTerm, SafetyLevel, Region } from '../types';

describe('Lexicon Data Model Validation', () => {
  
  // Property 14: Lexicon Term Validation
  // For any term returned as valid by the system, that term should exist in the verified lexicon database.
  test('Property 14: All terms in lexicon should have valid structure and required fields', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...LEXICON_DATA),
        (term: SlangTerm) => {
          // Every term must have all required fields
          expect(term.word).toBeDefined();
          expect(term.word).not.toBe('');
          expect(typeof term.word).toBe('string');
          
          expect(term.banglaScript).toBeDefined();
          expect(term.banglaScript).not.toBe('');
          expect(typeof term.banglaScript).toBe('string');
          
          expect(term.meaning).toBeDefined();
          expect(term.meaning).not.toBe('');
          expect(typeof term.meaning).toBe('string');
          
          expect(term.usage).toBeDefined();
          expect(term.usage).not.toBe('');
          expect(typeof term.usage).toBe('string');
          
          expect(term.safetyLevel).toBeDefined();
          expect(Object.values(SafetyLevel)).toContain(term.safetyLevel);
          
          expect(term.region).toBeDefined();
          expect(Array.isArray(term.region)).toBe(true);
          expect(term.region.length).toBeGreaterThan(0);
          term.region.forEach(region => {
            expect(Object.values(Region)).toContain(region);
          });
          
          expect(term.culturalContext).toBeDefined();
          expect(term.culturalContext).not.toBe('');
          expect(typeof term.culturalContext).toBe('string');
          
          // Examples are optional but if present should be array of strings
          if (term.examples) {
            expect(Array.isArray(term.examples)).toBe(true);
            term.examples.forEach(example => {
              expect(typeof example).toBe('string');
            });
          }
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('All lexicon terms should have unique words', () => {
    const words = LEXICON_DATA.map(term => term.word.toLowerCase());
    const uniqueWords = new Set(words);
    expect(uniqueWords.size).toBe(words.length);
  });

  test('All lexicon terms should have unique Bangla scripts', () => {
    const scripts = LEXICON_DATA.map(term => term.banglaScript);
    const uniqueScripts = new Set(scripts);
    expect(uniqueScripts.size).toBe(scripts.length);
  });

  test('Safety levels should be properly distributed', () => {
    const safetyLevels = LEXICON_DATA.map(term => term.safetyLevel);
    
    // Should have terms in each safety category
    expect(safetyLevels).toContain(SafetyLevel.SAFE_FRIENDLY);
    expect(safetyLevels).toContain(SafetyLevel.FRIENDLY_ROAST);
    expect(safetyLevels).toContain(SafetyLevel.OFFENSIVE_ANNOYING);
    expect(safetyLevels).toContain(SafetyLevel.DO_NOT_USE);
  });

  test('Regional distribution should cover all regions', () => {
    const allRegions = LEXICON_DATA.flatMap(term => term.region);
    
    // Should have terms for each region
    expect(allRegions).toContain(Region.KOLKATA);
    expect(allRegions).toContain(Region.BARDHAMAN);
    expect(allRegions).toContain(Region.TARAKESWAR_HOOGHLY);
  });

  test('DO_NOT_USE terms should have empty examples arrays', () => {
    const dangerousTerms = LEXICON_DATA.filter(term => term.safetyLevel === SafetyLevel.DO_NOT_USE);
    
    dangerousTerms.forEach(term => {
      // Dangerous terms should not have usage examples
      expect(!term.examples || term.examples.length === 0).toBe(true);
    });
  });

  test('SAFE_FRIENDLY terms should have usage examples', () => {
    const safeTerms = LEXICON_DATA.filter(term => term.safetyLevel === SafetyLevel.SAFE_FRIENDLY);
    
    safeTerms.forEach(term => {
      // Safe terms should have usage examples for learning
      expect(term.examples).toBeDefined();
      expect(term.examples!.length).toBeGreaterThan(0);
    });
  });
});