export declare enum SafetyLevel {
    SAFE_FRIENDLY = "Safe / Friendly",
    FRIENDLY_ROAST = "Friendly Roast",
    OFFENSIVE_ANNOYING = "Offensive / Annoying",
    DO_NOT_USE = "Do not use"
}
export declare enum Region {
    KOLKATA = "Kolkata",
    BARDHAMAN = "Bardhaman",
    TARAKESWAR_HOOGHLY = "Tarakeswar/Hooghly"
}
export declare enum ToneStyle {
    LIGHT_WITTY = "light_witty",
    EARTHY_RESPECTFUL = "earthy_respectful",
    EXTRA_CAUTIOUS = "extra_cautious"
}
export interface SlangTerm {
    word: string;
    banglaScript: string;
    meaning: string;
    usage: string;
    safetyLevel: SafetyLevel;
    region: Region[];
    culturalContext: string;
    examples?: string[];
}
export interface RegionalContext {
    region: Region;
    culturalMarkers: string[];
    toneStyle: ToneStyle;
    safetyThreshold: SafetyLevel;
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
//# sourceMappingURL=index.d.ts.map