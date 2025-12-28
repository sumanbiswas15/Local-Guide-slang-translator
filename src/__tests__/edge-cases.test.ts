// Unit tests for edge cases and error conditions

import { BengaliSlangTranslator } from '../BengaliSlangTranslator';
import { LexiconService } from '../services/LexiconService';
import { SafetyValidator } from '../services/SafetyValidator';
import { RegionalAdapter } from '../services/RegionalAdapter';
import { TranslationEngine } from '../services/TranslationEngine';
import { SafetyLevel } from '../types';

describe('Edge Cases and Error Conditions', () => {
  let translator: BengaliSlangTranslator;

  beforeEach(() => {
    translator = new BengaliSlangTranslator();
  });

  describe('Input Edge Cases', () => {
    test('should handle empty string input', () => {
      const result = translator.translate('');
      expect(result.isTermFound).toBe(false);
      expect(result.formattedResponse).toContain('Dada');
      expect(result.formattedResponse).toContain('ki bolcho');
    });

    test('should handle whitespace-only input', () => {
      const whitespaceInputs = ['   ', '\t', '\n', '\r\n', '  \t  \n  '];
      
      whitespaceInputs.forEach(input => {
        const result = translator.translate(input);
        expect(result.isTermFound).toBe(false);
        expect(result.formattedResponse).toContain('Dada');
      });
    });

    test('should handle very long input strings', () => {
      const longInput = 'a'.repeat(1000);
      const result = translator.translate(longInput);
      expect(result.isTermFound).toBe(false);
      expect(result.formattedResponse).toBeDefined();
      expect(result.formattedResponse.length).toBeGreaterThan(0);
    });

    test('should handle special characters and Unicode', () => {
      const specialInputs = [
        '!@#$%^&*()',
        '🗺️🇧🇩',
        'ল্যাদ123',
        'test-word',
        'word_with_underscore',
        'word.with.dots'
      ];

      specialInputs.forEach(input => {
        const result = translator.translate(input);
        expect(result.formattedResponse).toBeDefined();
        expect(result.formattedResponse.length).toBeGreaterThan(0);
      });
    });

    test('should handle mixed case input', () => {
      const mixedCaseInputs = [
        'LYADH',
        'lYaDh',
        'Fatafati',
        'FATAFATI'
      ];

      mixedCaseInputs.forEach(input => {
        const result = translator.translate(input);
        // Should find the term regardless of case
        expect(result.isTermFound).toBe(true);
        expect(result.term).not.toBeNull();
      });
    });

    test('should handle Bengali script input', () => {
      const result = translator.translate('ল্যাদ');
      expect(result.isTermFound).toBe(true);
      expect(result.term?.word).toBe('Lyadh');
    });
  });

  describe('Malformed Bengali Text Edge Cases', () => {
    test('should handle incomplete Bengali characters', () => {
      const incompleteChars = ['ল', 'য', 'া', 'দ'];
      
      incompleteChars.forEach(char => {
        const result = translator.translate(char);
        expect(result.formattedResponse).toBeDefined();
        // Should not crash, even if term not found
      });
    });

    test('should handle mixed Bengali and English', () => {
      const mixedInputs = [
        'lyadh ল্যাদ',
        'ল্যাদ lyadh',
        'test ফাটাফাটি word'
      ];

      mixedInputs.forEach(input => {
        const result = translator.translate(input);
        expect(result.formattedResponse).toBeDefined();
      });
    });
  });

  describe('Safety Level Boundary Conditions', () => {
    test('should handle all safety levels correctly', () => {
      const safetyLevels = Object.values(SafetyLevel);
      
      safetyLevels.forEach(level => {
        const lexiconService = new LexiconService();
        const termsWithLevel = lexiconService.getTermsBySafetyLevel(level);
        
        if (termsWithLevel.length > 0) {
          const sampleTerm = termsWithLevel[0];
          const result = translator.translate(sampleTerm.word);
          
          expect(result.isTermFound).toBe(true);
          expect(result.formattedResponse).toContain('Safety Level');
          expect(result.formattedResponse).toContain(level);
        }
      });
    });

    test('should handle transition between safety levels', () => {
      // Test a safe term
      const safeResult = translator.translate('fatafati');
      expect(safeResult.safetyWarning).toBeUndefined();
      expect(safeResult.formattedResponse).not.toContain('⚠️');

      // Test a dangerous term
      const dangerousResult = translator.translate('kelane');
      expect(dangerousResult.safetyWarning).toBeDefined();
      expect(dangerousResult.formattedResponse).toContain('⚠️');
    });
  });

  describe('Service Integration Edge Cases', () => {
    test('should handle empty lexicon gracefully', () => {
      const emptyLexicon = new LexiconService([]);
      const engine = new TranslationEngine(emptyLexicon);
      
      const result = engine.translateTerm('any-word');
      expect(result.isTermFound).toBe(false);
      expect(result.formattedResponse).toBeDefined();
    });

    test('should handle service initialization edge cases', () => {
      // Test with undefined services (should use defaults)
      const engine = new TranslationEngine(undefined, undefined, undefined);
      const result = engine.translateTerm('lyadh');
      
      expect(result.formattedResponse).toBeDefined();
    });
  });

  describe('Command Processing Edge Cases', () => {
    test('should handle empty commands', () => {
      const response = translator.processCommand('');
      expect(response).toContain('Invalid command');
    });

    test('should handle commands with extra spaces', () => {
      const response = translator.processCommand('  translate   lyadh   ');
      expect(response).toContain('ল্যাদ');
    });

    test('should handle case-insensitive commands', () => {
      const commands = [
        'TRANSLATE lyadh',
        'Translate lyadh',
        'SEARCH awesome',
        'Help',
        'RANDOM'
      ];

      commands.forEach(cmd => {
        const response = translator.processCommand(cmd);
        expect(response).not.toContain('Unknown command');
      });
    });

    test('should handle commands with no arguments where required', () => {
      const responses = [
        translator.processCommand('translate'),
        translator.processCommand('search')
      ];

      responses.forEach(response => {
        expect(response).toContain('please provide');
      });
    });

    test('should handle invalid region names', () => {
      const response = translator.processCommand('translate lyadh invalidregion');
      expect(response).toContain('ল্যাদ'); // Should still translate
    });
  });

  describe('Memory and Performance Edge Cases', () => {
    test('should handle multiple rapid translations', () => {
      const terms = ['lyadh', 'fatafati', 'chap', 'poka', 'aantel'];
      
      for (let i = 0; i < 100; i++) {
        const term = terms[i % terms.length];
        const result = translator.translate(term);
        expect(result.isTermFound).toBe(true);
      }
    });

    test('should handle concurrent translations', () => {
      const promises = [];
      
      for (let i = 0; i < 10; i++) {
        promises.push(Promise.resolve(translator.translate('lyadh')));
      }

      return Promise.all(promises).then(results => {
        results.forEach(result => {
          expect(result.isTermFound).toBe(true);
          expect(result.formattedResponse).toContain('ল্যাদ');
        });
      });
    });
  });

  describe('Regional Context Edge Cases', () => {
    test('should handle undefined regional context gracefully', () => {
      const result = translator.translate('lyadh', undefined);
      expect(result.isTermFound).toBe(true);
      expect(result.formattedResponse).toBeDefined();
    });

    test('should handle all region types', () => {
      const regions = ['kolkata', 'bardhaman', 'tarakeswar', 'hooghly', 'calcutta', 'burdwan'];
      
      regions.forEach(region => {
        const response = translator.processCommand(`translate lyadh ${region}`);
        expect(response).toContain('ল্যাদ');
      });
    });
  });

  describe('Fuzzy Matching Edge Cases', () => {
    test('should handle partial matches', () => {
      const partialInputs = ['lyad', 'fatafa', 'cha'];
      
      partialInputs.forEach(input => {
        const result = translator.translate(input);
        // Should either find a match or handle gracefully
        expect(result.formattedResponse).toBeDefined();
      });
    });

    test('should handle similar-sounding words', () => {
      const similarWords = ['liad', 'fatafaty', 'chapp'];
      
      similarWords.forEach(word => {
        const result = translator.translate(word);
        expect(result.formattedResponse).toBeDefined();
      });
    });
  });

  describe('Response Formatting Edge Cases', () => {
    test('should handle terms with no examples', () => {
      // Find a term with no examples (dangerous terms)
      const dangerousResult = translator.translate('kelane');
      expect(dangerousResult.isTermFound).toBe(true);
      expect(dangerousResult.formattedResponse).not.toContain('Examples:');
    });

    test('should handle very long cultural context', () => {
      // All terms should handle their cultural context regardless of length
      const result = translator.translate('lyadh');
      expect(result.formattedResponse).toContain('Cultural Context');
      expect(result.formattedResponse.length).toBeGreaterThan(100);
    });

    test('should handle formatting with special characters in content', () => {
      // Test that markdown formatting doesn't break with special content
      const result = translator.translate('fatafati');
      expect(result.formattedResponse).toContain('**');
      expect(result.formattedResponse).toContain('ফাটাফাটি');
    });
  });

  describe('Error Recovery Edge Cases', () => {
    test('should recover from processing errors gracefully', () => {
      // Test various inputs that might cause issues
      const problematicInputs = [
        null as any,
        undefined as any,
        123 as any,
        {} as any,
        [] as any
      ];

      problematicInputs.forEach(input => {
        const result = translator.translate(input);
        expect(result.formattedResponse).toBeDefined();
        expect(result.isTermFound).toBe(false);
        expect(result.formattedResponse).toContain('Invalid input type');
      });
    });

    test('should handle command processing with invalid input types', () => {
      const invalidCommands = [
        null as any,
        undefined as any,
        123 as any,
        {} as any
      ];

      invalidCommands.forEach(cmd => {
        const response = translator.processCommand(cmd);
        expect(typeof response).toBe('string');
        expect(response).toContain('Invalid command');
      });
    });
  });
});