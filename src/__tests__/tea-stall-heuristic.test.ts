// Property test for tea stall cultural heuristic
// Feature: bengali-slang-translator, Property 11: Tea Stall Cultural Heuristic

import * as fc from 'fast-check';
import { RegionalAdapter } from '../services/RegionalAdapter';
import { LEXICON_DATA } from '../data/lexicon';
import { SlangTerm, Region } from '../types';

describe('Tea Stall Cultural Heuristic', () => {
  let regionalAdapter: RegionalAdapter;

  beforeEach(() => {
    regionalAdapter = new RegionalAdapter();
  });

  // Property 11: Tea Stall Cultural Heuristic
  // For any input mentioning tea stalls or related terms, the response should suggest 
  // that tea stalls are the best place to learn more slang.
  test('Property 11: Tea stall mentions should trigger learning suggestion', () => {
    const teaStallRelatedInputs = [
      'tea stall',
      'cha-er dokan',
      'tea shop',
      'chai stall',
      'adda at tea stall',
      'cha dokan',
      'tea corner',
      'stall',
      'dokan'
    ];

    fc.assert(
      fc.property(
        fc.constantFrom(...teaStallRelatedInputs),
        fc.constantFrom(...Object.values(Region)),
        (teaInput: string, region: Region) => {
          // Create a mock term that mentions tea stalls
          const mockTerm: SlangTerm = {
            word: teaInput,
            banglaScript: 'চা-এর দোকান',
            meaning: 'Tea related term',
            usage: `This is used at ${teaInput} conversations`,
            safetyLevel: LEXICON_DATA[0].safetyLevel,
            region: [region],
            culturalContext: `Related to ${teaInput} culture`,
            examples: []
          };

          const culturalContext = regionalAdapter.getCulturalContext(region, mockTerm);
          
          // Should have heuristics about tea stalls
          const hasTeaStallHeuristic = culturalContext.heuristics.some(heuristic => 
            heuristic.toLowerCase().includes('tea stall') || 
            heuristic.toLowerCase().includes('cha-er dokan') ||
            heuristic.toLowerCase().includes('best place') ||
            heuristic.toLowerCase().includes('learn more slang')
          );
          
          expect(hasTeaStallHeuristic).toBe(true);
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Tea stall heuristic should contain specific message', () => {
    const teaStallTerm: SlangTerm = {
      word: 'adda',
      banglaScript: 'আড্ডা',
      meaning: 'Casual conversation',
      usage: 'Used for tea stall conversations and gatherings',
      safetyLevel: LEXICON_DATA[0].safetyLevel,
      region: [Region.KOLKATA],
      culturalContext: 'Tea stall culture',
      examples: []
    };

    const culturalContext = regionalAdapter.getCulturalContext(Region.KOLKATA, teaStallTerm);
    
    const expectedMessage = "Tea stalls (cha-er dokan) are the best places to learn more slang like this!";
    const hasExpectedMessage = culturalContext.heuristics.some(heuristic => 
      heuristic.includes(expectedMessage)
    );
    
    expect(hasExpectedMessage).toBe(true);
  });

  test('Non-tea-stall terms should not always trigger tea stall heuristic', () => {
    const nonTeaStallTerms = LEXICON_DATA.filter(term => 
      !term.word.toLowerCase().includes('tea') &&
      !term.word.toLowerCase().includes('cha') &&
      !term.word.toLowerCase().includes('stall') &&
      !term.word.toLowerCase().includes('dokan') &&
      !term.usage.toLowerCase().includes('tea') &&
      !term.usage.toLowerCase().includes('stall') &&
      !term.usage.toLowerCase().includes('adda')
    );

    // Most non-tea-stall terms should not trigger the heuristic
    let nonTeaStallTriggered = 0;
    const sampleSize = Math.min(10, nonTeaStallTerms.length);
    
    for (let i = 0; i < sampleSize; i++) {
      const term = nonTeaStallTerms[i];
      const culturalContext = regionalAdapter.getCulturalContext(term.region[0], term);
      
      const hasTeaStallHeuristic = culturalContext.heuristics.some(heuristic => 
        heuristic.toLowerCase().includes('tea stall') || 
        heuristic.toLowerCase().includes('cha-er dokan')
      );
      
      if (hasTeaStallHeuristic) {
        nonTeaStallTriggered++;
      }
    }

    // Should be less than half triggering the heuristic
    expect(nonTeaStallTriggered).toBeLessThan(sampleSize / 2);
  });

  test('Tea stall heuristic should be consistent across regions', () => {
    const teaStallTerm: SlangTerm = {
      word: 'cha',
      banglaScript: 'চা',
      meaning: 'Tea',
      usage: 'Used at tea stalls for ordering',
      safetyLevel: LEXICON_DATA[0].safetyLevel,
      region: [Region.KOLKATA],
      culturalContext: 'Tea culture',
      examples: []
    };

    Object.values(Region).forEach(region => {
      const culturalContext = regionalAdapter.getCulturalContext(region, teaStallTerm);
      
      const hasTeaStallHeuristic = culturalContext.heuristics.some(heuristic => 
        heuristic.toLowerCase().includes('tea stall') || 
        heuristic.toLowerCase().includes('cha-er dokan')
      );
      
      expect(hasTeaStallHeuristic).toBe(true);
    });
  });

  test('Heuristic message should be properly formatted', () => {
    const teaStallTerm: SlangTerm = {
      word: 'dokan',
      banglaScript: 'দোকান',
      meaning: 'Shop',
      usage: 'Used for tea stall shops',
      safetyLevel: LEXICON_DATA[0].safetyLevel,
      region: [Region.KOLKATA],
      culturalContext: 'Shop culture',
      examples: []
    };

    const culturalContext = regionalAdapter.getCulturalContext(Region.KOLKATA, teaStallTerm);
    
    culturalContext.heuristics.forEach(heuristic => {
      // Should be proper sentences
      expect(heuristic.trim().length).toBeGreaterThan(0);
      expect(heuristic.trim().endsWith('!')).toBe(true);
      
      // Should not have double spaces or formatting issues
      expect(heuristic).not.toMatch(/\s{2,}/);
    });
  });

  test('Tea stall keywords should be detected correctly', () => {
    const teaStallKeywords = [
      'tea stall conversation',
      'cha-er dokan visit',
      'adda session',
      'stall owner',
      'dokan culture'
    ];

    teaStallKeywords.forEach(keyword => {
      const mockTerm: SlangTerm = {
        word: 'test',
        banglaScript: 'টেস্ট',
        meaning: 'Test term',
        usage: keyword,
        safetyLevel: LEXICON_DATA[0].safetyLevel,
        region: [Region.KOLKATA],
        culturalContext: 'Test context',
        examples: []
      };

      const culturalContext = regionalAdapter.getCulturalContext(Region.KOLKATA, mockTerm);
      
      const hasTeaStallHeuristic = culturalContext.heuristics.some(heuristic => 
        heuristic.toLowerCase().includes('tea stall') || 
        heuristic.toLowerCase().includes('cha-er dokan')
      );
      
      expect(hasTeaStallHeuristic).toBe(true);
    });
  });
});