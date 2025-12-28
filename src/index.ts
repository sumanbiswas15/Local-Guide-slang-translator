// Main entry point for Bengali Slang Translator

export * from './types';
export * from './data/lexicon';

// Export service implementations (not interfaces to avoid conflicts)
export { LexiconService } from './services/LexiconService';
export { SafetyValidator } from './services/SafetyValidator';
export { RegionalAdapter } from './services/RegionalAdapter';
export { TranslationEngine } from './services/TranslationEngine';
export { BengaliSlangTranslator } from './BengaliSlangTranslator';

// Export interfaces separately
export type {
  TranslationEngine as ITranslationEngine,
  RegionalAdapter as IRegionalAdapter,
  LexiconService as ILexiconService,
  SafetyValidator as ISafetyValidator
} from './interfaces';

import { BengaliSlangTranslator } from './BengaliSlangTranslator';

// Main application function
export function main() {
  console.log('🗺️ The Local Guide: Bengali Slang Translator');
  console.log('Kiro - The Local Dada is ready to help!');
  
  const translator = new BengaliSlangTranslator();
  
  // Example usage
  console.log('\nExample translations:');
  console.log(translator.getFormattedResponse('lyadh'));
  console.log('\n' + '='.repeat(50) + '\n');
  console.log(translator.getFormattedResponse('fatafati'));
  
  return translator;
}

// Export default instance
export const translator = new BengaliSlangTranslator();