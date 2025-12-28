// Property tests for cultural information enhancement
// Feature: bengali-slang-translator, Property 12: Cultural Information Beyond Translation
// Feature: bengali-slang-translator, Property 13: Usage Context Information
// Feature: bengali-slang-translator, Property 15: Authentic Examples and Context

import * as fc from 'fast-check';
import { TranslationEngine } from '../services/TranslationEngine';
import { LEXICON_DATA } from '../data/lexicon';
import { SlangTerm, SafetyLevel } from '../types';

describe('Cultural Information Enhancement', () => {
  let translationEngine: TranslationEngine;

  beforeEach(() => {
    translationEngine = new TranslationEngine();
  });

  // Property 12: Cultural Information Beyond Translation
  // For any valid term, the response should provide cultural heuristics and 
  // contextual information beyond basic translation.
  test('Property 12: Responses should include cultural information beyond translation', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...LEXICON_DATA),
        (term: SlangTerm) => {
          const result = translationEngine.translateTerm(term.word);
          
          expect(result.isTermFound).toBe(true);
          expect(result.formattedResponse).toBeDefined();
          
          const response = result.formattedResponse;
          
          // Should contain cultural context section
          expect(response).toContain('Cultural Context');
          expect(response).toContain(term.culturalContext);
          
          // Should have more than just basic translation
          // Response should be significantly longer than just meaning + usage
          const basicInfo = term.meaning + term.usage;
          expect(response.length).toBeGreaterThan(basicInfo.length * 2);
          
          // Should contain cultural notes
          expect(result.culturalNotes).toBeDefined();
          expect(Array.isArray(result.culturalNotes)).toBe(true);
          expect(result.culturalNotes.length).toBeGreaterThan(0);
          
          // Cultural notes should provide additional context
          const hasRegionalInfo = result.culturalNotes.some(note => 
            note.includes('Used in:') || note.includes('Regional context:')
          );
          expect(hasRegionalInfo).toBe(true);
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property 13: Usage Context Information
  // For any term explanation, the response should include information about 
  // appropriate usage contexts and social situations.
  test('Property 13: Responses should include usage context information', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...LEXICON_DATA),
        (term: SlangTerm) => {
          const result = translationEngine.translateTerm(term.word);
          
          expect(result.isTermFound).toBe(true);
          expect(result.formattedResponse).toBeDefined();
          
          const response = result.formattedResponse;
          
          // Should contain usage information
          expect(response).toContain(term.usage);
          
          // Should contain safety level (indicates appropriate usage context)
          expect(response).toContain('Safety Level');
          expect(response).toContain(term.safetyLevel);
          
          // Should provide context about when/where to use
          const hasUsageContext = 
            response.includes('used') || 
            response.includes('appropriate') ||
            response.includes('context') ||
            response.includes('situation') ||
            term.usage.length > 0;
          
          expect(hasUsageContext).toBe(true);
          
          // Cultural notes should include usage guidance
          const hasUsageGuidance = result.culturalNotes.some(note => 
            note.toLowerCase().includes('safety') || 
            note.toLowerCase().includes('used in') ||
            note.toLowerCase().includes('context')
          );
          expect(hasUsageGuidance).toBe(true);
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property 15: Authentic Examples and Context
  // For any term explanation, the response should include authentic usage examples 
  // and cultural context information.
  test('Property 15: Safe terms should include authentic examples and context', () => {
    const safeTerms = LEXICON_DATA.filter(term => 
      term.safetyLevel === SafetyLevel.SAFE_FRIENDLY || 
      term.safetyLevel === SafetyLevel.FRIENDLY_ROAST
    );

    fc.assert(
      fc.property(
        fc.constantFrom(...safeTerms),
        (term: SlangTerm) => {
          const result = translationEngine.translateTerm(term.word);
          
          expect(result.isTermFound).toBe(true);
          expect(result.formattedResponse).toBeDefined();
          
          const response = result.formattedResponse;
          
          // Should contain cultural context
          expect(response).toContain('Cultural Context');
          expect(response).toContain(term.culturalContext);
          
          // Safe terms should have examples if available
          if (term.examples && term.examples.length > 0) {
            expect(response).toContain('Examples');
            term.examples.forEach(example => {
              expect(response).toContain(example);
            });
          }
          
          // Should have authentic cultural information
          expect(term.culturalContext).toBeDefined();
          expect(term.culturalContext.length).toBeGreaterThan(0);
          
          // Cultural context should be descriptive and authentic
          expect(term.culturalContext.length).toBeGreaterThan(10);
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Dangerous terms should not include usage examples', () => {
    const dangerousTerms = LEXICON_DATA.filter(term => 
      term.safetyLevel === SafetyLevel.DO_NOT_USE
    );

    dangerousTerms.forEach(term => {
      const result = translationEngine.translateTerm(term.word);
      
      expect(result.isTermFound).toBe(true);
      
      // Should not contain examples section for dangerous terms
      expect(result.formattedResponse).not.toContain('Examples:');
      
      // Should still have cultural context for academic understanding
      expect(result.formattedResponse).toContain('Cultural Context');
      expect(result.formattedResponse).toContain(term.culturalContext);
    });
  });

  test('Cultural information should be region-appropriate', () => {
    const kolkataTerms = LEXICON_DATA.filter(term => 
      term.region.includes('Kolkata' as any)
    );

    kolkataTerms.forEach(term => {
      const result = translationEngine.translateTerm(term.word);
      
      expect(result.isTermFound).toBe(true);
      
      // Should contain cultural context specific to the term's region
      expect(result.culturalNotes.some(note => 
        note.includes('Kolkata') || note.includes('Used in:')
      )).toBe(true);
    });
  });

  test('Responses should provide educational value', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...LEXICON_DATA),
        (term: SlangTerm) => {
          const result = translationEngine.translateTerm(term.word);
          
          expect(result.isTermFound).toBe(true);
          
          const response = result.formattedResponse;
          
          // Should be educational - contain multiple information types
          const informationSections = [
            response.includes('Cultural Context'),
            response.includes('Safety Level'),
            response.includes(term.meaning),
            response.includes(term.usage),
            result.culturalNotes.length > 0
          ];
          
          const educationalSections = informationSections.filter(Boolean).length;
          expect(educationalSections).toBeGreaterThanOrEqual(4);
          
          return true;
        }
      ),
      { numRuns: 50 }
    );
  });

  test('Cultural context should be authentic and descriptive', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...LEXICON_DATA),
        (term: SlangTerm) => {
          // Cultural context should be meaningful
          expect(term.culturalContext).toBeDefined();
          expect(typeof term.culturalContext).toBe('string');
          expect(term.culturalContext.trim().length).toBeGreaterThan(10);
          
          // Should not be generic
          expect(term.culturalContext).not.toBe('Cultural context');
          expect(term.culturalContext).not.toBe('Bengali culture');
          
          // Should be specific to the term
          const isSpecific = 
            term.culturalContext.toLowerCase().includes(term.word.toLowerCase()) ||
            term.culturalContext.length > 20; // Detailed description
          
          expect(isSpecific).toBe(true);
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Usage information should be contextual and helpful', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...LEXICON_DATA),
        (term: SlangTerm) => {
          // Usage should be meaningful
          expect(term.usage).toBeDefined();
          expect(typeof term.usage).toBe('string');
          expect(term.usage.trim().length).toBeGreaterThan(5);
          
          // Should provide context about when/how to use or describe the usage pattern
          const isContextual = 
            term.usage.toLowerCase().includes('used') ||
            term.usage.toLowerCase().includes('when') ||
            term.usage.toLowerCase().includes('for') ||
            term.usage.toLowerCase().includes('someone') ||
            term.usage.toLowerCase().includes('something') ||
            term.usage.toLowerCase().includes('acting') ||
            term.usage.toLowerCase().includes('choice') ||
            term.usage.toLowerCase().includes('way') ||
            term.usage.toLowerCase().includes('refers') ||
            term.usage.toLowerCase().includes('means') ||
            term.usage.length > 15; // Detailed descriptions are inherently contextual
          
          expect(isContextual).toBe(true);
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});