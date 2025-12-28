// Integration tests for complete translation flow

import { BengaliSlangTranslator } from '../BengaliSlangTranslator';
import { Region } from '../types';

describe('Bengali Slang Translator Integration', () => {
  let translator: BengaliSlangTranslator;

  beforeEach(() => {
    translator = new BengaliSlangTranslator();
  });

  describe('End-to-End Translation Flow', () => {
    test('should translate safe terms with complete information', () => {
      const result = translator.translate('lyadh');
      
      expect(result.isTermFound).toBe(true);
      expect(result.term).not.toBeNull();
      expect(result.formattedResponse).toBeDefined();
      
      // Should contain all required elements
      expect(result.formattedResponse).toContain('ল্যাদ'); // Bangla script
      expect(result.formattedResponse).toContain('Proactive Laziness'); // Meaning
      expect(result.formattedResponse).toContain('Cultural Context'); // Cultural info
      expect(result.formattedResponse).toContain('Safety Level'); // Safety info
      expect(result.formattedResponse).toContain('Dada'); // Addressing
      
      // Should not have safety warnings for safe terms
      expect(result.safetyWarning).toBeUndefined();
      expect(result.formattedResponse).not.toContain('⚠️');
    });

    test('should handle dangerous terms with proper warnings', () => {
      const result = translator.translate('Kelane');
      
      expect(result.isTermFound).toBe(true);
      expect(result.term).not.toBeNull();
      expect(result.safetyWarning).toBeDefined();
      
      // Should contain safety warning
      expect(result.formattedResponse).toContain('⚠️');
      expect(result.formattedResponse).toContain('be careful');
      expect(result.formattedResponse).toContain('heavy slang');
      
      // Should still contain basic information
      expect(result.formattedResponse).toContain('ক্যালানে'); // Bangla script
      expect(result.formattedResponse).toContain('Safety Level');
    });

    test('should handle unknown terms gracefully', () => {
      const result = translator.translate('unknownslangterm123');
      
      expect(result.isTermFound).toBe(false);
      expect(result.term).toBeNull();
      expect(result.safetyWarning).toBeUndefined();
      
      // Should maintain persona
      expect(result.formattedResponse).toContain('Dada');
      expect(result.formattedResponse).toContain('jani na');
      expect(result.formattedResponse).toContain('cha-er dokan');
    });

    test('should handle Bhaiya correction', () => {
      const result = translator.translate('bhaiya lyadh');
      
      expect(result.formattedResponse).toContain('Boss, ekhane \'Dada\' (দাদা) bolun');
      expect(result.culturalNotes.some(note => 
        note.toLowerCase().includes('bhaiya correction')
      )).toBe(true);
      
      // Should still process the actual term
      expect(result.formattedResponse).toContain('lyadh');
      expect(result.formattedResponse).toContain('ল্যাদ');
    });
  });

  describe('Regional Context Integration', () => {
    test('should adapt responses for Kolkata context', () => {
      const result = translator.translateKolkata('lyadh');
      
      expect(result.isTermFound).toBe(true);
      
      // Should contain Kolkata-specific cultural elements
      const response = result.formattedResponse;
      const culturalContent = [
        ...result.culturalNotes,
        response
      ].join(' ').toLowerCase();
      
      const hasKolkataMarkers = 
        culturalContent.includes('kolkata') ||
        culturalContent.includes('lyadh') ||
        culturalContent.includes('adda');
      
      expect(hasKolkataMarkers).toBe(true);
    });

    test('should adapt responses for Bardhaman context', () => {
      const bardhamanTerm = 'situa';
      const result = translator.translateBardhaman(bardhamanTerm);
      
      expect(result.isTermFound).toBe(true);
      
      // Should contain Bardhaman-specific cultural elements
      const response = result.formattedResponse;
      const culturalContent = [
        ...result.culturalNotes,
        response
      ].join(' ').toLowerCase();
      
      const hasBardhamanMarkers = 
        culturalContent.includes('bardhaman') ||
        culturalContent.includes('mihidana') ||
        culturalContent.includes('sitabhog');
      
      expect(hasBardhamanMarkers).toBe(true);
    });

    test('should be extra cautious for Tarakeswar context', () => {
      const result = translator.translateTarakeswar('jatri');
      
      expect(result.isTermFound).toBe(true);
      
      // Should contain temple town context
      const response = result.formattedResponse;
      const culturalContent = [
        ...result.culturalNotes,
        response
      ].join(' ').toLowerCase();
      
      const hasTempleContext = 
        culturalContent.includes('temple') ||
        culturalContent.includes('tarakeswar') ||
        culturalContent.includes('pilgrim');
      
      expect(hasTempleContext).toBe(true);
    });
  });

  describe('Application Interface Integration', () => {
    test('should provide formatted responses', () => {
      const response = translator.getFormattedResponse('fatafati');
      
      expect(typeof response).toBe('string');
      expect(response.length).toBeGreaterThan(0);
      expect(response).toContain('ফাটাফাটি');
      expect(response).toContain('Awesome');
    });

    test('should validate term existence', () => {
      expect(translator.termExists('lyadh')).toBe(true);
      expect(translator.termExists('fatafati')).toBe(true);
      expect(translator.termExists('nonexistentterm')).toBe(false);
    });

    test('should return regional terms', () => {
      const kolkataTerms = translator.getRegionalTerms(Region.KOLKATA);
      expect(Array.isArray(kolkataTerms)).toBe(true);
      expect(kolkataTerms.length).toBeGreaterThan(0);
      expect(kolkataTerms).toContain('Lyadh');
      
      const bardhamanTerms = translator.getRegionalTerms(Region.BARDHAMAN);
      expect(bardhamanTerms).toContain('Situa');
    });

    test('should search by meaning', () => {
      const lazyTerms = translator.searchByMeaning('laziness');
      expect(Array.isArray(lazyTerms)).toBe(true);
      expect(lazyTerms.length).toBeGreaterThan(0);
      
      const awesomeTerms = translator.searchByMeaning('awesome');
      expect(awesomeTerms).toContain('Fatafati');
    });

    test('should provide random terms', () => {
      const randomTerm = translator.getRandomTerm();
      expect(randomTerm).not.toBeNull();
      expect(typeof randomTerm).toBe('string');
      expect(translator.termExists(randomTerm!)).toBe(true);
    });

    test('should provide safe terms for learning', () => {
      const safeTerms = translator.getSafeTerms();
      expect(Array.isArray(safeTerms)).toBe(true);
      expect(safeTerms.length).toBeGreaterThan(0);
      
      // All returned terms should be safe
      safeTerms.forEach(term => {
        const result = translator.translate(term);
        expect(result.safetyWarning).toBeUndefined();
      });
    });
  });

  describe('Command Processing Integration', () => {
    test('should process translate commands', () => {
      const response = translator.processCommand('translate lyadh');
      expect(response).toContain('ল্যাদ');
      expect(response).toContain('Proactive Laziness');
    });

    test('should process translate commands with region', () => {
      const response = translator.processCommand('translate lyadh kolkata');
      expect(response).toContain('ল্যাদ');
      expect(response).toContain('Proactive Laziness');
    });

    test('should process search commands', () => {
      const response = translator.processCommand('search awesome');
      expect(response).toContain('Found terms:');
      expect(response).toContain('Fatafati');
    });

    test('should process random commands', () => {
      const response = translator.processCommand('random');
      expect(response).toContain('Random term:');
      expect(response).toContain('**'); // Should contain formatted response
    });

    test('should process safe-terms commands', () => {
      const response = translator.processCommand('safe-terms');
      expect(response).toContain('Safe terms to learn:');
    });

    test('should process help commands', () => {
      const response = translator.processCommand('help');
      expect(response).toContain('Commands:');
      expect(response).toContain('translate');
      expect(response).toContain('search');
    });

    test('should handle invalid commands', () => {
      const response = translator.processCommand('invalidcommand');
      expect(response).toContain('Unknown command');
      expect(response).toContain('help');
    });

    test('should handle empty translate commands', () => {
      const response = translator.processCommand('translate');
      expect(response).toContain('please provide a term');
    });

    test('should handle empty search commands', () => {
      const response = translator.processCommand('search');
      expect(response).toContain('please provide a meaning');
    });
  });

  describe('Error Handling Integration', () => {
    test('should handle empty input gracefully', () => {
      const result = translator.translate('');
      expect(result.isTermFound).toBe(false);
      expect(result.formattedResponse).toContain('Dada');
      expect(result.formattedResponse).toContain('ki bolcho');
    });

    test('should handle whitespace input', () => {
      const result = translator.translate('   ');
      expect(result.isTermFound).toBe(false);
      expect(result.formattedResponse).toContain('Dada');
    });

    test('should handle command processing errors gracefully', () => {
      // This would test error handling in command processing
      const response = translator.processCommand('translate');
      expect(response).not.toContain('Error processing command');
      expect(response).toContain('please provide a term');
    });
  });

  describe('Cultural Heuristics Integration', () => {
    test('should trigger tea stall heuristic', () => {
      // Create a mock scenario that should trigger tea stall heuristic
      const result = translator.translate('adda');
      
      // Should contain cultural information
      expect(result.culturalNotes.length).toBeGreaterThan(0);
      
      // The response or cultural context should reference tea stalls
      const allContent = [
        result.formattedResponse,
        ...result.culturalNotes
      ].join(' ').toLowerCase();
      
      const hasTeaStallReference = 
        allContent.includes('tea stall') ||
        allContent.includes('cha-er dokan') ||
        allContent.includes('adda');
      
      expect(hasTeaStallReference).toBe(true);
    });

    test('should provide comprehensive cultural education', () => {
      const result = translator.translate('lyadh');
      
      // Should have multiple types of cultural information
      expect(result.formattedResponse).toContain('Cultural Context');
      expect(result.culturalNotes.length).toBeGreaterThan(0);
      expect(result.personalityElements.length).toBeGreaterThan(0);
      
      // Should be educational beyond basic translation
      const responseLength = result.formattedResponse.length;
      const basicInfoLength = 'lyadh means Proactive Laziness'.length;
      expect(responseLength).toBeGreaterThan(basicInfoLength * 3);
    });
  });
});