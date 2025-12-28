// Property test for safety classification visibility
// Feature: bengali-slang-translator, Property 16: Safety Classification Visibility

import * as fc from 'fast-check';
import { TranslationEngine } from '../services/TranslationEngine';
import { LEXICON_DATA } from '../data/lexicon';
import { SlangTerm } from '../types';

describe('Safety Classification Visibility', () => {
  let translationEngine: TranslationEngine;

  beforeEach(() => {
    translationEngine = new TranslationEngine();
  });

  // Property 16: Safety Classification Visibility
  // For any term with safety classifications, those classifications should be 
  // clearly visible and prominent in the response.
  test('Property 16: Safety classifications should be clearly visible', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...LEXICON_DATA),
        (term: SlangTerm) => {
          const result = translationEngine.translateTerm(term.word);
          
          expect(result.isTermFound).toBe(true);
          expect(result.formattedResponse).toBeDefined();
          
          const response = result.formattedResponse;
          
          // Should contain "Safety Level" section
          expect(response).toContain('Safety Level');
          
          // Should contain the actual safety level
          expect(response).toContain(term.safetyLevel);
          
          // Safety level should be prominently displayed (not buried in text)
          const safetyLevelIndex = response.indexOf('Safety Level');
          expect(safetyLevelIndex).toBeGreaterThan(-1);
          
          // Should be formatted prominently (with markdown bold)
          expect(response).toContain('**Safety Level:**');
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Dangerous terms should have prominent warning visibility', () => {
    const dangerousTerms = LEXICON_DATA.filter(term => 
      term.safetyLevel === 'Do not use'
    );

    dangerousTerms.forEach(term => {
      const result = translationEngine.translateTerm(term.word);
      
      expect(result.isTermFound).toBe(true);
      expect(result.safetyWarning).toBeDefined();
      
      const response = result.formattedResponse;
      
      // Should have warning emoji for visibility
      expect(response).toContain('⚠️');
      
      // Warning should appear early in the response
      const warningIndex = response.indexOf('⚠️');
      const banglaScriptIndex = response.indexOf(term.banglaScript);
      expect(warningIndex).toBeGreaterThan(banglaScriptIndex);
      
      // Should contain the safety warning text
      expect(response).toContain('be careful');
      expect(response).toContain('heavy slang');
      
      // Safety level should still be visible at the end
      expect(response).toContain('Safety Level');
      expect(response).toContain(term.safetyLevel);
    });
  });

  test('Safe terms should have clear safety indication', () => {
    const safeTerms = LEXICON_DATA.filter(term => 
      term.safetyLevel === 'Safe / Friendly'
    );

    safeTerms.forEach(term => {
      const result = translationEngine.translateTerm(term.word);
      
      expect(result.isTermFound).toBe(true);
      expect(result.safetyWarning).toBeUndefined();
      
      const response = result.formattedResponse;
      
      // Should not have warning symbols
      expect(response).not.toContain('⚠️');
      
      // Should still clearly show safety level
      expect(response).toContain('Safety Level');
      expect(response).toContain('Safe / Friendly');
      
      // Safety information should be visible and accessible
      const safetyIndex = response.indexOf('Safety Level');
      expect(safetyIndex).toBeGreaterThan(-1);
    });
  });

  test('Safety information should be consistently formatted', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...LEXICON_DATA),
        (term: SlangTerm) => {
          const result = translationEngine.translateTerm(term.word);
          
          expect(result.isTermFound).toBe(true);
          
          const response = result.formattedResponse;
          
          // Safety Level should be formatted consistently
          expect(response).toMatch(/\*\*Safety Level:\*\* .+/);
          
          // Should be at the end of the response for consistency
          const lines = response.split('\n');
          const lastMeaningfulLine = lines.filter(line => line.trim().length > 0).pop();
          expect(lastMeaningfulLine).toContain('Safety Level');
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Safety warnings should be formatted for maximum visibility', () => {
    const warningTerms = LEXICON_DATA.filter(term => 
      term.safetyLevel === 'Do not use' || term.safetyLevel === 'Offensive / Annoying'
    );

    warningTerms.forEach(term => {
      const result = translationEngine.translateTerm(term.word);
      
      if (result.safetyWarning) {
        const response = result.formattedResponse;
        
        // Warning should be on its own line for visibility
        const warningLines = response.split('\n').filter(line => 
          line.includes('⚠️') || line.includes('be careful')
        );
        expect(warningLines.length).toBeGreaterThan(0);
        
        // Warning should not be buried in other text
        const warningLine = warningLines[0];
        expect(warningLine.trim().startsWith('⚠️')).toBe(true);
      }
    });
  });

  test('All safety levels should be represented and visible', () => {
    const safetyLevels = ['Safe / Friendly', 'Friendly Roast', 'Offensive / Annoying', 'Do not use'];
    
    safetyLevels.forEach(level => {
      const termsWithLevel = LEXICON_DATA.filter(term => term.safetyLevel === level);
      expect(termsWithLevel.length).toBeGreaterThan(0);
      
      const sampleTerm = termsWithLevel[0];
      const result = translationEngine.translateTerm(sampleTerm.word);
      
      expect(result.formattedResponse).toContain('Safety Level');
      expect(result.formattedResponse).toContain(level);
    });
  });

  test('Safety visibility should not interfere with other content', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...LEXICON_DATA),
        (term: SlangTerm) => {
          const result = translationEngine.translateTerm(term.word);
          
          const response = result.formattedResponse;
          
          // Safety information should be present but not overwhelming
          expect(response).toContain(term.banglaScript);
          expect(response).toContain(term.meaning);
          expect(response).toContain(term.usage);
          expect(response).toContain('Safety Level');
          
          // Safety level should be clearly separated from other content
          const safetyIndex = response.indexOf('Safety Level');
          const meaningIndex = response.indexOf(term.meaning);
          
          // Safety should come after meaning (at the end)
          expect(safetyIndex).toBeGreaterThan(meaningIndex);
          
          return true;
        }
      ),
      { numRuns: 50 }
    );
  });
});