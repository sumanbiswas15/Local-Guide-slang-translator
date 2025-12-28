// SafetyValidator - Enforces content safety protocols and warning systems

import { SafetyValidator as ISafetyValidator } from '../interfaces';
import { SlangTerm, SafetyLevel, SafetyWarning } from '../types';

export class SafetyValidator implements ISafetyValidator {

  /**
   * Assess the safety level of a term
   */
  assessSafetyLevel(term: SlangTerm): SafetyLevel {
    return term.safetyLevel;
  }

  /**
   * Generate appropriate warning for a term based on its safety level
   */
  generateWarning(term: SlangTerm): SafetyWarning {
    const level = term.safetyLevel;

    switch (level) {
      case SafetyLevel.DO_NOT_USE:
        return {
          level,
          warningText: "Dada/Didi, be careful! This is a heavy slang. Do not use this in public.",
          socialConsequences: [
            "Can cause serious offense and social embarrassment",
            "May damage relationships and reputation",
            "Could lead to confrontation or conflict",
            "Inappropriate in all social and professional settings",
            "May be considered harassment or abuse"
          ],
          academicExplanation: `The term "${term.word}" (${term.banglaScript}) is ${term.meaning.toLowerCase()}. ${term.usage} This term is considered highly offensive in Bengali culture and should never be used in conversation.`,
          recommendedAction: "Avoid using this term completely. Learn respectful alternatives for communication."
        };

      case SafetyLevel.OFFENSIVE_ANNOYING:
        return {
          level,
          warningText: "Dada/Didi, this word can be offensive. Use with caution.",
          socialConsequences: [
            "May cause discomfort or offense to others",
            "Not appropriate in formal or respectful conversations",
            "Could be misunderstood or taken negatively",
            "Better to avoid in mixed company"
          ],
          academicExplanation: `The term "${term.word}" (${term.banglaScript}) means ${term.meaning.toLowerCase()}. ${term.usage} While not the most offensive, it can still cause discomfort.`,
          recommendedAction: "Use only in very informal settings with close friends who understand the context."
        };

      case SafetyLevel.FRIENDLY_ROAST:
        return {
          level,
          warningText: "This is playful teasing language - use with friends who understand the joke!",
          socialConsequences: [
            "Generally harmless among friends",
            "Could be misunderstood by strangers",
            "Context and relationship matter a lot",
            "Best used in casual, friendly settings"
          ],
          academicExplanation: `The term "${term.word}" (${term.banglaScript}) means ${term.meaning.toLowerCase()}. ${term.usage} It's typically used for friendly banter.`,
          recommendedAction: "Safe to use with friends, but be mindful of your audience and their comfort level."
        };

      case SafetyLevel.SAFE_FRIENDLY:
      default:
        return {
          level,
          warningText: "This is safe and friendly language!",
          socialConsequences: [
            "No negative social consequences",
            "Appropriate in most social settings",
            "Helps you sound more local and authentic",
            "Generally well-received by Bengali speakers"
          ],
          academicExplanation: `The term "${term.word}" (${term.banglaScript}) means ${term.meaning.toLowerCase()}. ${term.usage} This is a commonly accepted expression in Bengali culture.`,
          recommendedAction: "Feel free to use this term - it will help you connect with local Bengali culture!"
        };
    }
  }

  /**
   * Determine if content should be blocked based on safety level
   */
  shouldBlockContent(safetyLevel: SafetyLevel): boolean {
    // We don't block content, but we provide strong warnings for dangerous content
    // This allows for academic discussion while emphasizing safety
    return false;
  }

  /**
   * Check if a term requires a safety warning
   */
  requiresWarning(term: SlangTerm): boolean {
    return term.safetyLevel === SafetyLevel.DO_NOT_USE || 
           term.safetyLevel === SafetyLevel.OFFENSIVE_ANNOYING;
  }

  /**
   * Get the warning text for dangerous terms (used in responses)
   */
  getWarningText(term: SlangTerm): string {
    if (term.safetyLevel === SafetyLevel.DO_NOT_USE) {
      return "Dada/Didi, be careful! This is a heavy slang. Do not use this in public.";
    } else if (term.safetyLevel === SafetyLevel.OFFENSIVE_ANNOYING) {
      return "Dada/Didi, this word can be offensive. Use with caution.";
    }
    return "";
  }

  /**
   * Get social consequences for a term
   */
  getSocialConsequences(term: SlangTerm): string[] {
    const warning = this.generateWarning(term);
    return warning.socialConsequences;
  }

  /**
   * Check if term is safe for examples and usage demonstrations
   */
  isSafeForExamples(term: SlangTerm): boolean {
    return term.safetyLevel === SafetyLevel.SAFE_FRIENDLY || 
           term.safetyLevel === SafetyLevel.FRIENDLY_ROAST;
  }

  /**
   * Get appropriate tone for explaining a term based on safety level
   */
  getExplanationTone(term: SlangTerm): 'academic' | 'friendly' | 'cautious' | 'warning' {
    switch (term.safetyLevel) {
      case SafetyLevel.DO_NOT_USE:
        return 'academic'; // Academic tone for dangerous terms
      case SafetyLevel.OFFENSIVE_ANNOYING:
        return 'cautious';
      case SafetyLevel.FRIENDLY_ROAST:
        return 'friendly';
      case SafetyLevel.SAFE_FRIENDLY:
      default:
        return 'friendly';
    }
  }
}