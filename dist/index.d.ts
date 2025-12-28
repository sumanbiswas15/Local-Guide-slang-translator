export * from './types';
export * from './data/lexicon';
export { LexiconService } from './services/LexiconService';
export { SafetyValidator } from './services/SafetyValidator';
export { RegionalAdapter } from './services/RegionalAdapter';
export { TranslationEngine } from './services/TranslationEngine';
export { BengaliSlangTranslator } from './BengaliSlangTranslator';
export type { TranslationEngine as ITranslationEngine, RegionalAdapter as IRegionalAdapter, LexiconService as ILexiconService, SafetyValidator as ISafetyValidator } from './interfaces';
import { BengaliSlangTranslator } from './BengaliSlangTranslator';
export declare function main(): BengaliSlangTranslator;
export declare const translator: BengaliSlangTranslator;
//# sourceMappingURL=index.d.ts.map