import { RegionalAdapter as IRegionalAdapter } from '../interfaces';
import { Region, SlangTerm, CulturalContext, PersonalityTraits } from '../types';
export declare class RegionalAdapter implements IRegionalAdapter {
    /**
     * Adapt tone based on region-specific personality
     */
    adaptTone(region: Region, baseResponse: string): string;
    /**
     * Get cultural context for a region and term
     */
    getCulturalContext(region: Region, term: SlangTerm): CulturalContext;
    /**
     * Get personality traits for a region
     */
    getPersonalityTraits(region: Region): PersonalityTraits;
    /**
     * Apply Kolkata-specific tone (light and witty)
     */
    private applyKolkataTone;
    /**
     * Apply Bardhaman-specific tone (earthy but respectful)
     */
    private applyBardhamanTone;
    /**
     * Apply Tarakeswar/Hooghly-specific tone (extra cautious)
     */
    private applyTarakeswarTone;
    /**
     * Get regional cultural markers
     */
    private getRegionalMarkers;
    /**
     * Get regional cultural references
     */
    private getRegionalReferences;
    /**
     * Get regional heuristics based on term and region
     */
    private getRegionalHeuristics;
    /**
     * Check if term is related to tea stalls
     */
    private isTeaStallRelated;
    /**
     * Get appropriate addressing term for region
     */
    getRegionalAddressing(region: Region): string;
    /**
     * Check if region requires extra caution
     */
    requiresExtraCaution(region: Region): boolean;
}
//# sourceMappingURL=RegionalAdapter.d.ts.map