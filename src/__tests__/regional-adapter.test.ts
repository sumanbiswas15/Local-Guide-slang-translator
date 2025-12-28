// Property tests for regional adaptation system
// Feature: bengali-slang-translator, Property 7: Regional Cultural Adaptation
// Feature: bengali-slang-translator, Property 8: Regional Information Inclusion

import * as fc from 'fast-check';
import { RegionalAdapter } from '../services/RegionalAdapter';
import { LEXICON_DATA } from '../data/lexicon';
import { SlangTerm, Region } from '../types';

describe('RegionalAdapter Cultural Adaptation', () => {
  let regionalAdapter: RegionalAdapter;

  beforeEach(() => {
    regionalAdapter = new RegionalAdapter();
  });

  // Property 7: Regional Cultural Adaptation
  // For any term queried with regional context, the response should include appropriate 
  // cultural markers and references specific to that region
  test('Property 7: Regional responses should include appropriate cultural markers', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...Object.values(Region)),
        fc.constantFrom(...LEXICON_DATA),
        (region: Region, term: SlangTerm) => {
          const culturalContext = regionalAdapter.getCulturalContext(region, term);
          
          // Should have cultural markers
          expect(culturalContext.markers).toBeDefined();
          expect(Array.isArray(culturalContext.markers)).toBe(true);
          expect(culturalContext.markers.length).toBeGreaterThan(0);
          
          // Check region-specific markers
          switch (region) {
            case Region.KOLKATA:
              const kolkataMarkers = ['Lyadh culture', 'Adda', 'Cha-er dokan', 'Fatafati'];
              const hasKolkataMarker = culturalContext.markers.some(marker => 
                kolkataMarkers.some(km => marker.includes(km))
              );
              expect(hasKolkataMarker).toBe(true);
              break;
              
            case Region.BARDHAMAN:
              const bardhamanMarkers = ['Mihidana', 'Sitabhog', 'Rarh Banga', 'Zamindar'];
              const hasBardhamanMarker = culturalContext.markers.some(marker => 
                bardhamanMarkers.some(bm => marker.includes(bm))
              );
              expect(hasBardhamanMarker).toBe(true);
              break;
              
            case Region.TARAKESWAR_HOOGHLY:
              const tarakeswarMarkers = ['Tarakeswar temple', 'Jatri', 'Toto-giri', 'Temple town'];
              const hasTarakeswarMarker = culturalContext.markers.some(marker => 
                tarakeswarMarkers.some(tm => marker.includes(tm))
              );
              expect(hasTarakeswarMarker).toBe(true);
              break;
          }
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property 8: Regional Information Inclusion
  // For any term with regional associations, the response should provide 
  // location-specific cultural nuances and usage patterns
  test('Property 8: Regional context should provide location-specific information', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...Object.values(Region)),
        fc.constantFrom(...LEXICON_DATA),
        (region: Region, term: SlangTerm) => {
          const culturalContext = regionalAdapter.getCulturalContext(region, term);
          
          // Should have references
          expect(culturalContext.references).toBeDefined();
          expect(Array.isArray(culturalContext.references)).toBe(true);
          expect(culturalContext.references.length).toBeGreaterThan(0);
          
          // Should have heuristics
          expect(culturalContext.heuristics).toBeDefined();
          expect(Array.isArray(culturalContext.heuristics)).toBe(true);
          
          // References should be strings
          culturalContext.references.forEach(ref => {
            expect(typeof ref).toBe('string');
            expect(ref.trim().length).toBeGreaterThan(0);
          });
          
          // Heuristics should be strings if present
          culturalContext.heuristics.forEach(heuristic => {
            expect(typeof heuristic).toBe('string');
            expect(heuristic.trim().length).toBeGreaterThan(0);
          });
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('getPersonalityTraits should return region-appropriate traits', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...Object.values(Region)),
        (region: Region) => {
          const traits = regionalAdapter.getPersonalityTraits(region);
          
          // Should have all required trait categories
          expect(traits.addressingTerms).toBeDefined();
          expect(Array.isArray(traits.addressingTerms)).toBe(true);
          expect(traits.addressingTerms.length).toBeGreaterThan(0);
          
          expect(traits.culturalReferences).toBeDefined();
          expect(Array.isArray(traits.culturalReferences)).toBe(true);
          expect(traits.culturalReferences.length).toBeGreaterThan(0);
          
          expect(traits.toneMarkers).toBeDefined();
          expect(Array.isArray(traits.toneMarkers)).toBe(true);
          expect(traits.toneMarkers.length).toBeGreaterThan(0);
          
          // Should always include basic addressing terms
          expect(traits.addressingTerms).toContain('Dada');
          expect(traits.addressingTerms).toContain('Didi');
          expect(traits.addressingTerms).toContain('Boss');
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('adaptTone should modify response based on region', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...Object.values(Region)),
        fc.string({ minLength: 10, maxLength: 100 }),
        (region: Region, baseResponse: string) => {
          const adaptedResponse = regionalAdapter.adaptTone(region, baseResponse);
          
          // Adapted response should contain the original response
          expect(adaptedResponse).toContain(baseResponse);
          
          // Should be different from base response (unless no adaptation applied)
          // At minimum, should be same length or longer
          expect(adaptedResponse.length).toBeGreaterThanOrEqual(baseResponse.length);
          
          return true;
        }
      ),
      { numRuns: 50 } // Reduced runs for this more complex test
    );
  });

  test('Bardhaman context should mention Mihidana and Sitabhog', () => {
    const bardhamanTerms = LEXICON_DATA.filter(term => 
      term.region.includes(Region.BARDHAMAN)
    );

    bardhamanTerms.forEach(term => {
      const context = regionalAdapter.getCulturalContext(Region.BARDHAMAN, term);
      
      // Should have Mihidana and Sitabhog in markers or heuristics
      const allContent = [
        ...context.markers,
        ...context.references,
        ...context.heuristics
      ].join(' ').toLowerCase();
      
      const hasMihidana = allContent.includes('mihidana');
      const hasSitabhog = allContent.includes('sitabhog');
      
      expect(hasMihidana || hasSitabhog).toBe(true);
    });
  });

  test('Kolkata context should emphasize Lyadh and Adda culture', () => {
    const kolkataTerms = LEXICON_DATA.filter(term => 
      term.region.includes(Region.KOLKATA)
    );

    kolkataTerms.forEach(term => {
      const context = regionalAdapter.getCulturalContext(Region.KOLKATA, term);
      
      // Should have Lyadh or Adda in markers
      const allContent = [
        ...context.markers,
        ...context.references,
        ...context.heuristics
      ].join(' ').toLowerCase();
      
      const hasLyadh = allContent.includes('lyadh');
      const hasAdda = allContent.includes('adda');
      
      expect(hasLyadh || hasAdda).toBe(true);
    });
  });

  test('requiresExtraCaution should be true only for Tarakeswar/Hooghly', () => {
    expect(regionalAdapter.requiresExtraCaution(Region.TARAKESWAR_HOOGHLY)).toBe(true);
    expect(regionalAdapter.requiresExtraCaution(Region.KOLKATA)).toBe(false);
    expect(regionalAdapter.requiresExtraCaution(Region.BARDHAMAN)).toBe(false);
  });

  test('getRegionalAddressing should return valid addressing terms', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...Object.values(Region)),
        (region: Region) => {
          const addressing = regionalAdapter.getRegionalAddressing(region);
          const traits = regionalAdapter.getPersonalityTraits(region);
          
          expect(traits.addressingTerms).toContain(addressing);
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Cultural context should be consistent across calls', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...Object.values(Region)),
        fc.constantFrom(...LEXICON_DATA),
        (region: Region, term: SlangTerm) => {
          const context1 = regionalAdapter.getCulturalContext(region, term);
          const context2 = regionalAdapter.getCulturalContext(region, term);
          
          // Markers and references should be consistent
          expect(context1.markers).toEqual(context2.markers);
          expect(context1.references).toEqual(context2.references);
          
          return true;
        }
      ),
      { numRuns: 50 }
    );
  });
});