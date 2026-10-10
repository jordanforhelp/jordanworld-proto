/**
 * Bankroll IQ — Quantitative calculation utilities
 * Kelly Criterion, EV, odds conversion, simulation engine
 */

export type OddsFormat = 'american' | 'decimal';

export interface KellyInputs {
  bankroll: number;
  decimalOdds: number;
  winProbability: number; // 0–1
  minStake: number;
}

export interface KellyResult {
  fullKellyFraction: number;
  fullKellyStake: number;
  halfKellyFraction: number;
  halfKellyStake: number;
  quarterKellyFraction: number;
  quarterKellyStake: number;
  flat2PctStake: number;
  expectedValue: number;
  isPositiveEV: boolean;
  belowMinStake: boolean;
  recommendedStake: number;
  recommendedLabel: string;
}

/** Convert American odds to decimal */
export function americanToDecimal(american: number): number {
  if (american === 0) return 1;
  if (american > 0) {
    return american / 100 + 1;
  }
  return 100 / Math.abs(american) + 1;
}

/** Convert decimal odds to American */
export function decimalToAmerican(decimal: number): number {
  if (decimal <= 1) return 0;
  if (decimal >= 2) {
    return Math.round((decimal - 1) * 100);
  }
  return Math.round(-100 / (decimal - 1));
}

/** Parse odds string (handles +110, -110, 2.10, etc.) */
export function parseOdds(input: string, format: OddsFormat): number | null {
  const cleaned = input.trim().replace(/,/g, '');
  if (!cleaned) return null;
  const num = parseFloat(cleaned);
  if (isNaN(num)) return null;

  if (format === 'american') {
    // Accept +110 or 110 or -110
    return num;
  }
  // Decimal must be > 1
  if (num <= 1) return null;
  return num;
}

/** Implied probability from decimal odds (includes vig) */
export function impliedProbability(decimalOdds: number): number {
  if (decimalOdds <= 1) return 0;
  return 1 / decimalOdds;
}

/**
 * Full Kelly Criterion
 * f* = (p * b - q) / b
 * where b = decimalOdds - 1, q = 1 - p
 */
export function fullKellyFraction(p: number, decimalOdds: number): number {
  if (p <= 0 || p >= 1 || decimalOdds <= 1) return 0;
  const b = decimalOdds - 1;
  const q = 1 - p;
  const f = (p * b - q) / b;
  return Math.max(0, f); // never negative stake
}

/** Expected Value: EV = p * decimalOdds - 1 */
export function expectedValue(p: number, decimalOdds: number): number {
  return p * decimalOdds - 1;
}

/** Core calculation engine */
export function calculateKelly(inputs: KellyInputs): KellyResult {
  const { bankroll, decimalOdds, winProbability: p, minStake } = inputs;

  const fStar = fullKellyFraction(p, decimalOdds);
  const halfF = fStar / 2;
  const quarterF = fStar / 4;

  const fullStake = fStar * bankroll;
  const halfStake = halfF * bankroll;
  const quarterStake = quarterF * bankroll;
  const flatStake = 0.02 * bankroll;

  const ev = expectedValue(p, decimalOdds);
  const isPositiveEV = ev > 0;

  // Prefer quarter Kelly for micro bankrolls, fall back to half if too small
  let recommendedStake = quarterStake;
  let recommendedLabel = 'Quarter Kelly';
  if (quarterStake < minStake && halfStake >= minStake) {
    recommendedStake = halfStake;
    recommendedLabel = 'Half Kelly (raised)';
  } else if (quarterStake < minStake && fullStake >= minStake) {
    recommendedStake = fullStake;
    recommendedLabel = 'Full Kelly (raised)';
  }

  const belowMinStake = recommendedStake > 0 && recommendedStake < minStake;

  return {
    fullKellyFraction: fStar,
    fullKellyStake: fullStake,
    halfKellyFraction: halfF,
    halfKellyStake: halfStake,
    quarterKellyFraction: quarterF,
    quarterKellyStake: quarterStake,
    flat2PctStake: flatStake,
    expectedValue: ev,
    isPositiveEV,
    belowMinStake,
    recommendedStake,
    recommendedLabel,
  };
}

/** Remove vig from 2-way market and return fair probabilities */
export function removeVig(
  odds1: number, // decimal
  odds2: number
): { fairP1: number; fairP2: number; overround: number } {
  const imp1 = 1 / odds1;
  const imp2 = 1 / odds2;
  const overround = imp1 + imp2;
  if (overround <= 0) {
    return { fairP1: 0.5, fairP2: 0.5, overround: 0 };
  }
  return {
    fairP1: imp1 / overround,
    fairP2: imp2 / overround,
    overround: overround - 1, // vig percentage as decimal
  };
}

export interface SimulationPoint {
  bet: number;
  quarterKelly: number;
  halfKelly: number;
  flat: number;
}

/**
 * Monte-Carlo style trajectory simulation (deterministic edge for demo)
 * Uses the same EV / win probability for each bet.
 * For visualization of growth paths under different staking.
 */
export function simulateBankrollTrajectory(
  startingBankroll: number,
  decimalOdds: number,
  winProb: number,
  numBets: number = 50,
  seed: number = 42
): SimulationPoint[] {
  // Simple seeded PRNG (mulberry32)
  let state = seed;
  const random = () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const points: SimulationPoint[] = [
    { bet: 0, quarterKelly: startingBankroll, halfKelly: startingBankroll, flat: startingBankroll },
  ];

  let qBank = startingBankroll;
  let hBank = startingBankroll;
  let fBank = startingBankroll;

  const b = decimalOdds - 1; // net odds

  for (let i = 1; i <= numBets; i++) {
    const win = random() < winProb;

    // Quarter Kelly
    const qF = fullKellyFraction(winProb, decimalOdds) / 4;
    const qStake = Math.min(qBank * qF, qBank); // never bet more than bankroll
    if (qStake > 0) {
      qBank = win ? qBank + qStake * b : qBank - qStake;
      qBank = Math.max(0, qBank);
    }

    // Half Kelly
    const hF = fullKellyFraction(winProb, decimalOdds) / 2;
    const hStake = Math.min(hBank * hF, hBank);
    if (hStake > 0) {
      hBank = win ? hBank + hStake * b : hBank - hStake;
      hBank = Math.max(0, hBank);
    }

    // Flat 2%
    const fStake = Math.min(fBank * 0.02, fBank);
    if (fStake > 0) {
      fBank = win ? fBank + fStake * b : fBank - fStake;
      fBank = Math.max(0, fBank);
    }

    points.push({
      bet: i,
      quarterKelly: Math.round(qBank * 100) / 100,
      halfKelly: Math.round(hBank * 100) / 100,
      flat: Math.round(fBank * 100) / 100,
    });
  }

  return points;
}

/** Format currency */
export function formatUSD(value: number, decimals = 2): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/** Format percentage */
export function formatPct(value: number, decimals = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}
