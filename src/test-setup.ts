// Test setup configuration for fast-check property testing
import * as fc from 'fast-check';

// Configure fast-check for consistent property testing
beforeEach(() => {
  // Set minimum iterations for property tests
  fc.configureGlobal({
    numRuns: 100, // Minimum 100 iterations as per design requirements
    verbose: false,
    seed: 42, // Consistent seed for reproducible tests
  });
});

// Global test timeout for property tests
jest.setTimeout(10000);