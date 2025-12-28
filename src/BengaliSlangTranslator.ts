// Main application interface for Bengali Slang Translator

import { TranslationEngine } from './services/TranslationEngine';
import { LexiconService } from './services/LexiconService';
import { SafetyValidator } from './services/SafetyValidator';
import { RegionalAdapter } from './services/RegionalAdapter';
import { 
  TranslationResult, 
  RegionalContext, 
  Region, 
  ToneStyle, 
  SafetyLevel 
} from './types';

export class BengaliSlangTranslator {
  private translationEngine: TranslationEngine;
  private lexiconService: LexiconService;
  private safetyValidator: SafetyValidator;
  private regionalAdapter: RegionalAdapter;

  constructor() {
    this.lexiconService = new LexiconService();
    this.safetyValidator = new SafetyValidator();
    this.regionalAdapter = new RegionalAdapter();
    this.translationEngine = new TranslationEngine(
      this.lexiconService,
      this.safetyValidator,
      this.regionalAdapter
    );
  }

  /**
   * Main translation method - translate a term with optional regional context
   */
  translate(input: string, region?: Region): TranslationResult {
    try {
      // Handle invalid input types
      if (input === null || input === undefined || typeof input !== 'string') {
        return this.createErrorResult('', new Error('Invalid input type'));
      }

      let context: RegionalContext | undefined;
      
      if (region) {
        context = this.createRegionalContext(region);
      }

      return this.translationEngine.translateTerm(input, context);
    } catch (error) {
      return this.createErrorResult(input, error);
    }
  }

  /**
   * Translate with Kolkata context
   */
  translateKolkata(input: string): TranslationResult {
    return this.translate(input, Region.KOLKATA);
  }

  /**
   * Translate with Bardhaman context
   */
  translateBardhaman(input: string): TranslationResult {
    return this.translate(input, Region.BARDHAMAN);
  }

  /**
   * Translate with Tarakeswar/Hooghly context
   */
  translateTarakeswar(input: string): TranslationResult {
    return this.translate(input, Region.TARAKESWAR_HOOGHLY);
  }

  /**
   * Get formatted response string (for simple usage)
   */
  getFormattedResponse(input: string, region?: Region): string {
    const result = this.translate(input, region);
    return result.formattedResponse;
  }

  /**
   * Check if a term exists in the lexicon
   */
  termExists(term: string): boolean {
    return this.lexiconService.validateTermExists(term);
  }

  /**
   * Get all terms for a specific region
   */
  getRegionalTerms(region: Region): string[] {
    return this.lexiconService.getTermsByRegion(region).map(term => term.word);
  }

  /**
   * Search terms by meaning
   */
  searchByMeaning(query: string): string[] {
    return this.lexiconService.searchByMeaning(query).map(term => term.word);
  }

  /**
   * Get a random term for exploration
   */
  getRandomTerm(): string | null {
    const term = this.lexiconService.getRandomTerm();
    return term ? term.word : null;
  }

  /**
   * Get safe terms only (for learning/examples)
   */
  getSafeTerms(): string[] {
    return this.lexiconService.getTermsBySafetyLevel(SafetyLevel.SAFE_FRIENDLY)
      .map(term => term.word);
  }

  /**
   * Interactive CLI method for testing
   */
  async interactiveMode(): Promise<void> {
    console.log('🗺️ The Local Guide: Bengali Slang Translator');
    console.log('Kiro - The Local Dada is ready to help!');
    console.log('Type "exit" to quit, "help" for commands\n');

    // This would require readline in a real CLI implementation
    // For now, just show the interface structure
    console.log('Available commands:');
    console.log('- translate <term> [region]');
    console.log('- search <meaning>');
    console.log('- random');
    console.log('- safe-terms');
    console.log('- help');
    console.log('- exit');
  }

  /**
   * Process a command (for CLI interface)
   */
  processCommand(command: string): string {
    if (!command || typeof command !== 'string') {
      return 'Invalid command. Type "help" for available commands.';
    }

    const parts = command.trim().split(/\s+/); // Split on any whitespace
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    try {
      switch (cmd) {
        case 'translate':
          if (args.length === 0) {
            return 'Dada, please provide a term to translate!';
          }
          const term = args[0];
          const region = this.parseRegion(args[1]);
          const result = this.translate(term, region);
          return result.formattedResponse;

        case 'search':
          if (args.length === 0) {
            return 'Dada, please provide a meaning to search for!';
          }
          const query = args.join(' ');
          const terms = this.searchByMeaning(query);
          if (terms.length === 0) {
            return `No terms found for "${query}". Try different keywords!`;
          }
          return `Found terms: ${terms.join(', ')}`;

        case 'random':
          const randomTerm = this.getRandomTerm();
          if (!randomTerm) {
            return 'No terms available!';
          }
          const randomResult = this.translate(randomTerm);
          return `Random term: ${randomResult.formattedResponse}`;

        case 'safe-terms':
          const safeTerms = this.getSafeTerms();
          return `Safe terms to learn: ${safeTerms.slice(0, 10).join(', ')}${safeTerms.length > 10 ? '...' : ''}`;

        case 'help':
          return this.getHelpText();

        case 'exit':
          return 'Dhonnobad! Come back anytime to learn more Bengali slang!';

        default:
          return `Unknown command "${cmd}". Type "help" for available commands.`;
      }
    } catch (error) {
      return `Error processing command: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  }

  /**
   * Create regional context for a region
   */
  private createRegionalContext(region: Region): RegionalContext {
    const traits = this.regionalAdapter.getPersonalityTraits(region);
    
    return {
      region,
      culturalMarkers: traits.culturalReferences,
      toneStyle: this.getToneStyleForRegion(region),
      safetyThreshold: this.getSafetyThresholdForRegion(region)
    };
  }

  /**
   * Get tone style for region
   */
  private getToneStyleForRegion(region: Region): ToneStyle {
    switch (region) {
      case Region.KOLKATA:
        return ToneStyle.LIGHT_WITTY;
      case Region.BARDHAMAN:
        return ToneStyle.EARTHY_RESPECTFUL;
      case Region.TARAKESWAR_HOOGHLY:
        return ToneStyle.EXTRA_CAUTIOUS;
      default:
        return ToneStyle.LIGHT_WITTY;
    }
  }

  /**
   * Get safety threshold for region
   */
  private getSafetyThresholdForRegion(region: Region): SafetyLevel {
    // Tarakeswar/Hooghly is more conservative (temple town)
    if (region === Region.TARAKESWAR_HOOGHLY) {
      return SafetyLevel.FRIENDLY_ROAST;
    }
    return SafetyLevel.SAFE_FRIENDLY;
  }

  /**
   * Parse region from string
   */
  private parseRegion(regionStr?: string): Region | undefined {
    if (!regionStr) return undefined;
    
    const normalized = regionStr.toLowerCase();
    switch (normalized) {
      case 'kolkata':
      case 'calcutta':
        return Region.KOLKATA;
      case 'bardhaman':
      case 'burdwan':
        return Region.BARDHAMAN;
      case 'tarakeswar':
      case 'hooghly':
      case 'tarakeswar-hooghly':
        return Region.TARAKESWAR_HOOGHLY;
      default:
        return undefined;
    }
  }

  /**
   * Create error result for exceptions
   */
  private createErrorResult(input: string, error: any): TranslationResult {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return {
      term: null,
      formattedResponse: `Dada, something went wrong while processing "${input}": ${errorMessage}`,
      safetyWarning: undefined,
      culturalNotes: ['Error occurred during processing'],
      personalityElements: [
        { type: 'addressing', content: 'Dada' }
      ],
      isTermFound: false
    };
  }

  /**
   * Get help text for CLI
   */
  private getHelpText(): string {
    return `
🗺️ The Local Guide - Bengali Slang Translator Commands:

translate <term> [region] - Translate a Bengali slang term
  Example: translate lyadh kolkata

search <meaning> - Search for terms by meaning
  Example: search lazy

random - Get a random term with explanation

safe-terms - List safe terms for learning

help - Show this help message

exit - Exit the translator

Regions: kolkata, bardhaman, tarakeswar
    `.trim();
  }
}