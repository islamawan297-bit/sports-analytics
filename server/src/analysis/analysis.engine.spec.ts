import { Test, TestingModule } from '@nestjs/testing';
import { AnalysisEngine } from './analysis.engine';

describe('AnalysisEngine Unit Tests', () => {
  let engine: AnalysisEngine;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnalysisEngine],
    }).compile();

    engine = module.get<AnalysisEngine>(AnalysisEngine);
  });

  it('should calculate statistical estimates with confidence intervals', () => {
    const homeStats = { offenseRating: 118.5, defenseRating: 110.2, pace: 99.4, ppg: 117.8, oppg: 112.4 };
    const awayStats = { offenseRating: 112.0, defenseRating: 114.5, pace: 98.1, ppg: 110.2, oppg: 115.6 };

    const estimate = engine.calculateGameEstimate(homeStats, awayStats);

    expect(estimate.isEstimate).toBe(true);
    expect(estimate.label).toBe('Statistical Estimate');
    expect(estimate.homeWinProbability).toBeGreaterThan(50);
    expect(estimate.confidencePct).toBeGreaterThanOrEqual(60);
    expect(estimate.uncertaintyMargin).toBe('± 4.2 pts');
    expect(estimate.disclaimer).toContain('probabilistic calculations');
  });

  it('should generate team comparison metrics with advantages', () => {
    const homeStats = { offenseRating: 120.0, defenseRating: 108.0, pace: 100.0, ppg: 118.0, oppg: 108.0 };
    const awayStats = { offenseRating: 110.0, defenseRating: 115.0, pace: 95.0, ppg: 105.0, oppg: 115.0 };

    const comparisons = engine.generateTeamComparison(homeStats, awayStats);

    expect(comparisons.length).toBe(5);
    const offRating = comparisons.find((c) => c.metric === 'Offensive Rating');
    expect(offRating?.advantage).toBe('home');
  });
});
