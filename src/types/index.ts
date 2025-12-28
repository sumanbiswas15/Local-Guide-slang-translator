// Core data types for Bengali Slang Translator

export enum SafetyLevel {
  SAFE_FRIENDLY = 'Safe / Friendly',
  FRIENDLY_ROAST = 'Friendly Roast', 
  OFFENSIVE_ANNOYING = 'Offensive / Annoying',
  DO_NOT_USE = 'Do not use'
}

export enum Region {
  KOLKATA = 'Kolkata',
  BARDHAMAN = 'Bardhaman', 
  TARAKESWAR_HOOGHLY = 'Tarakeswar/Hooghly'
}

export enum ToneStyle {
  LIGHT_WITTY = 'light_witty',
  EARTHY_RESPECTFUL = 'earthy_respectful',
  EXTRA_CAUTIOUS = 'extra_cautious'
}

export interface SlangTerm {
  word: string;                    // Original term
  banglaScript: string;           // Bengali script representation
  meaning: string;                // English translation
  usage: string;                  // Cultural usage and nuance
  safetyLevel: SafetyLevel;       // Content safety classification
  region: Region[];               // Associated geographic regions
  culturalContext: string;        // Additional cultural information
  examples?: string[];            // Usage examples
}

export interface RegionalContext {
  region: Region;
  culturalMarkers: string[];      // Key cultural elements (Mihidana, Adda, etc.)
  toneStyle: ToneStyle;          // Communication style for region
  safetyThreshold: SafetyLevel;  // Regional sensitivity level
}

export interface SafetyWarning {
  level: SafetyLevel;
  warningText: string;
  socialConsequences: string[];
  academicExplanation: string;
  recommendedAction: string;
}

export interface PersonalityElement {
  type: 'addressing' | 'cultural_reference' | 'tone_marker';
  content: string;
  region?: Region;
}

export interface TranslationResult {
  term: SlangTerm | null;
  formattedResponse: string;
  safetyWarning?: SafetyWarning;
  culturalNotes: string[];
  personalityElements: PersonalityElement[];
  isTermFound: boolean;
}

export interface CulturalContext {
  markers: string[];
  references: string[];
  heuristics: string[];
}

export interface PersonalityTraits {
  addressingTerms: string[];
  culturalReferences: string[];
  toneMarkers: string[];
}

export interface SafetyAssessment {
  level: SafetyLevel;
  requiresWarning: boolean;
  warningText?: string;
  socialConsequences: string[];
}

export interface FormattedResponse {
  content: string;
  safetyWarning?: SafetyWarning;
  culturalNotes: string[];
}