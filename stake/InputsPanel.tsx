import { Calculator, RefreshCw } from 'lucide-react';
import {
  americanToDecimal,
  decimalToAmerican,
  parseOdds,
  impliedProbability,
  type OddsFormat,
} from '../lib/calculations';
import { cn } from '../lib/utils';

interface InputsPanelProps {
  bankroll: number;
  setBankroll: (v: number) => void;
  oddsFormat: OddsFormat;
  setOddsFormat: (f: OddsFormat) => void;
  oddsInput: string;
  setOddsInput: (s: string) => void;
  winProbPct: number;
  setWinProbPct: (v: number) => void;
  minStake: number;
  setMinStake: (v: number) => void;
  onDeriveImplied: () => void;
}

export function InputsPanel({
  bankroll,
  setBankroll,
  oddsFormat,
  setOddsFormat,
  oddsInput,
  setOddsInput,
  winProbPct,
  setWinProbPct,
  minStake,
  setMinStake,
  onDeriveImplied,
}: InputsPanelProps) {
  const parsed = parseOdds(oddsInput, oddsFormat);
  const decimalOdds =
    parsed !== null
      ? oddsFormat === 'american'
        ? americanToDecimal(parsed)
        : parsed
      : null;

  return (
    <div className="card p-5 space-y-5">
      <div className="flex items-center gap-2 mb-1">
        <Calculator className="h-5 w-5 text-[#efefef]" />
        <h2 className="text-base font-semibold text-[#efefef] tracking-wide">Inputs</h2>
      </div>

      {/* Bankroll */}
      <div>
        <label className="label">Starting Bankroll (USD)</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#868686] text-sm">$</span>
          <input
            type="number"
            min={1}
            step={1}
            value={bankroll}
            onChange={(e) => setBankroll(Math.max(0, parseFloat(e.target.value) || 0))}
            className="input-base pl-7 font-mono"
          />
        </div>
      </div>

      {/* Odds format toggle */}
      <div>
        <label className="label">Odds Format</label>
        <div className="flex rounded-lg border border-[#2a2a2a] overflow-hidden">
          <button
            type="button"
            onClick={() => {
              if (oddsFormat === 'decimal' && decimalOdds) {
                const am = decimalToAmerican(decimalOdds);
                setOddsInput(am > 0 ? `+${am}` : String(am));
              }
              setOddsFormat('american');
            }}
            className={cn(
              'flex-1 py-2.5 text-sm font-bold uppercase tracking-wider transition-colors',
              oddsFormat === 'american'
                ? 'bg-[#efefef] text-black'
                : 'bg-black text-[#868686] hover:text-[#efefef]'
            )}
          >
            American
          </button>
          <button
            type="button"
            onClick={() => {
              if (oddsFormat === 'american' && parsed !== null) {
                setOddsInput(americanToDecimal(parsed).toFixed(2));
              }
              setOddsFormat('decimal');
            }}
            className={cn(
              'flex-1 py-2.5 text-sm font-bold uppercase tracking-wider transition-colors',
              oddsFormat === 'decimal'
                ? 'bg-[#efefef] text-black'
                : 'bg-black text-[#868686] hover:text-[#efefef]'
            )}
          >
            Decimal
          </button>
        </div>
      </div>

      {/* Bookie odds */}
      <div>
        <label className="label">
          Bookie Odds {oddsFormat === 'american' ? '(e.g. +110 / -110)' : '(e.g. 2.10)'}
        </label>
        <input
          type="text"
          value={oddsInput}
          onChange={(e) => setOddsInput(e.target.value)}
          className="input-base font-mono"
          placeholder={oddsFormat === 'american' ? '+110' : '2.10'}
        />
        {decimalOdds && decimalOdds > 1 && (
          <p className="mt-1.5 text-xs text-[#868686] font-mono">
            Decimal: {decimalOdds.toFixed(3)} · Implied: {(impliedProbability(decimalOdds) * 100).toFixed(1)}%
          </p>
        )}
      </div>

      {/* Win probability */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="label !mb-0">Estimated Win Probability (%)</label>
          <button
            type="button"
            onClick={onDeriveImplied}
            disabled={!decimalOdds || decimalOdds <= 1}
            className="btn-ghost text-[0.65rem] py-1 px-2"
            title="Set win probability to the bookie's implied probability (no edge)"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Derive Implied
          </button>
        </div>
        <input
          type="number"
          min={1}
          max={99}
          step={0.1}
          value={winProbPct}
          onChange={(e) => setWinProbPct(Math.min(99, Math.max(0, parseFloat(e.target.value) || 0)))}
          className="input-base font-mono"
        />
        <input
          type="range"
          min={1}
          max={99}
          step={0.5}
          value={winProbPct}
          onChange={(e) => setWinProbPct(parseFloat(e.target.value))}
          className="w-full mt-2 accent-[#efefef]"
        />
      </div>

      {/* Min stake */}
      <div>
        <label className="label">Sportsbook Minimum Stake ($)</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#868686] text-sm">$</span>
          <input
            type="number"
            min={0.01}
            step={0.01}
            value={minStake}
            onChange={(e) => setMinStake(Math.max(0.01, parseFloat(e.target.value) || 0.5))}
            className="input-base pl-7 font-mono"
          />
        </div>
      </div>
    </div>
  );
}
