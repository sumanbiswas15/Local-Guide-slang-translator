// Property tests for safety validation system
// Feature: bengali-slang-translator, Property 5: Safety Warning Protocol
// Feature: bengali-slang-translator, Property 6: Safety Consequence Information

import * as fc from 'fast-check';
import { SafetyValidator } from '../services/SafetyValidator';
import { LEXICON_DATA } from '../data/lexicon';
import { SlangTerm, SafetyLevel } from '../types';

describe('SafetyValidator Warning Protocol', () => {
  let safetyValidator: SafetyValidator;

  beforeEach(() => {
    safetyValidator = new SafetyValidator();
  });

  // Property 5: Safety Warning Protocol
  // For any term marked with safety level "Do not use", the response should start with 
  // the exact warning text "Dada/Didi, be careful! This is a heavy slang. Do not use this in public."
  test('Property 5: DO_NOT_USE terms should have exact warning text', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...LEXICON_DATA.filter(term => term.safetyLevel === SafetyLevel.DO_NOT_USE)),
        (dangerousTerm: SlangTerm) => {
          const warningText = safetyValidator.getWarningText(dangerousTerm);
          const expectedWarning = "Dada/Didi, be careful! This is a heavy slang. Do not use this in public.";
          
          expect(warningText).toBe(expectedWarning);
          
          // Also test through generateWarning method
          const fullWarning = safetyValidator.generateWarning(dangerousTerm);
          expect(fullWarning.warningText).toBe(expectedWarning);
          expect(fullWarning.level).toBe(SafetyLevel.DO_NOT_USE);
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property 6: Safety Consequence Information
  // For any term with safety warnings, the response should include clear explanations 
  // of potential social consequences.
  test('Property 6: Terms with warnings should include social consequences', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...LEXICON_DATA.filter(term => 
          term.safetyLevel === SafetyLevel.DO_NOT_USE || 
          term.safetyLevel === SafetyLevel.OFFENSIVE_ANNOYING
        )),
        (warningTerm: SlangTerm) => {
          const warning = safetyValidator.generateWarning(warningTerm);
          
          // Should have social consequences
          expect(warning.socialConsequences).toBeDefined();
          expect(Array.isArray(warning.socialConsequences)).toBe(true);
          expect(warning.socialConsequences.length).toBeGreaterThan(0);
          
          // Each consequence should be a non-empty string
          warning.socialConsequences.forEach(consequence => {
            expect(typeof consequence).toBe('string');
            expect(consequence.trim().length).toBeGreaterThan(0);
          });
          
          // Should have academic explanation
          expect(warning.academicExplanation).toBeDefined();
          expect(typeof warning.academicExplanation).toBe('string');
          expect(warning.academicExplanation.trim().length).toBeGreaterThan(0);
          
          // Should have recommended action
          expect(warning.recommendedAction).toBeDefined();
          expect(typeof warning.recommendedAction).toBe('string');
          expect(warning.recommendedAction.trim().length).toBeGreaterThan(0);
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('assessSafetyLevel should return the term\'s safety level', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...LEXICON_DATA),
        (term: SlangTerm) => {
          const assessedLevel = safetyValidator.assessSafetyLevel(term);
          expect(assessedLevel).toBe(term.safetyLevel);
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('requiresWarning should be true for dangerous terms', () => {
    const dangerousTerms = LEXICON_DATA.filter(term => 
      term.safetyLevel === SafetyLevel.DO_NOT_USE || 
      term.safetyLevel === SafetyLevel.OFFENSIVE_ANNOYING
    );

    dangerousTerms.forEach(term => {
      expect(safetyValidator.requiresWarning(term)).toBe(true);
    });
  });

  test('requiresWarning should be false for safe terms', () => {
    const safeTerms = LEXICON_DATA.filter(term => 
      term.safetyLevel === SafetyLevel.SAFE_FRIENDLY || 
      term.safetyLevel === SafetyLevel.FRIENDLY_ROAST
    );

    safeTerms.forEach(term => {
      expect(safetyValidator.requiresWarning(term)).toBe(false);
    });
  });

  test('shouldBlockContent should never block content (academic approach)', () => {
    Object.values(SafetyLevel).forEach(level => {
      expect(safetyValidator.shouldBlockContent(level)).toBe(false);
    });
  });

  test('isSafeForExamples should match safety level appropriately', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...LEXICON_DATA),
        (term: SlangTerm) => {
          const safeForExamples = safetyValidator.isSafeForExamples(term);
          const expectedSafe = term.safetyLevel === SafetyLevel.SAFE_FRIENDLY || 
                              term.safetyLevel === SafetyLevel.FRIENDLY_ROAST;
          
          expect(safeForExamples).toBe(expectedSafe);
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('getExplanationTone should match safety level', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...LEXICON_DATA),
        (term: SlangTerm) => {
          const tone = safetyValidator.getExplanationTone(term);
          
          switch (term.safetyLevel) {
            case SafetyLevel.DO_NOT_USE:
              expect(tone).toBe('academic');
              break;
            case SafetyLevel.OFFENSIVE_ANNOYING:
              expect(tone).toBe('cautious');
              break;
            case SafetyLevel.FRIENDLY_ROAST:
              expect(tone).toBe('friendly');
              break;
            case SafetyLevel.SAFE_FRIENDLY:
              expect(tone).toBe('friendly');
              break;
          }
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Warning text should be empty for safe terms', () => {
    const safeTerms = LEXICON_DATA.filter(term => 
      term.safetyLevel === SafetyLevel.SAFE_FRIENDLY || 
      term.safetyLevel === SafetyLevel.FRIENDLY_ROAST
    );

    safeTerms.forEach(term => {
      const warningText = safetyValidator.getWarningText(term);
      expect(warningText).toBe('');
    });
  });

  test('All warning components should be consistent', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...LEXICON_DATA),
        (term: SlangTerm) => {
          const warning = safetyValidator.generateWarning(term);
          
          // Warning level should match term's safety level
          expect(warning.level).toBe(term.safetyLevel);
          
          // All required fields should be present
          expect(warning.warningText).toBeDefined();
          expect(warning.socialConsequences).toBeDefined();
          expect(warning.academicExplanation).toBeDefined();
          expect(warning.recommendedAction).toBeDefined();
          
          // Academic explanation should mention the term
          expect(warning.academicExplanation).toContain(term.word);
          expect(warning.academicExplanation).toContain(term.banglaScript);
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});