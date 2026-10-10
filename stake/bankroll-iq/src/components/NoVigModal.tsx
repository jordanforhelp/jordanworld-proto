import { useState, useMemo } from 'react';
import { X, Scale } from 'lucide-react';
import {
  americanToDecimal,
  decimalToAmerican,
  parseOdds,
  removeVig,
  formatPct,
  type OddsFormat,
} from '../lib/calculations';

interface NoVigModalProps {
  open: boolean;
  onClose: () => void;
  oddsFormat: OddsFormat;
}

export function NoVigModal({ open, onClose, oddsFormat }: NoVigModalProps) {
  const [odds1Str, setOdds1Str] = useState(oddsFormat === 'american' ? '-110' : '1.91');
  const [odds2Str, setOdds2Str] = useState(oddsFormat === 'american' ? '-110' : '1.91');

  const result = useMemo(() => {
    const o1Raw = parseOdds(odds1Str, oddsFormat);
    const o2Raw = parseOdds(odds2Str, oddsFormat);
    if (o1Raw === null || o2Raw === null) return null;

    const d1 = oddsFormat === 'american' ? americanToDecimal(o1Raw) : o1Raw;
    const d2 = oddsFormat === 'american' ? americanToDecimal(o2Raw) : o2Raw;

    if (d1 <= 1 || d2 <= 1) return null;

    const { fairP1, fairP2, overround } = removeVig(d1, d2);
    return {
      d1,
      d2,
      fairP1,
      fairP2,
      overround,
      fairOdds1: 1 / fairP1,
      fairOdds2: 1 / fairP2,
    };
  }, [odds1Str, odds2Str, oddsFormat]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative card w-full max-w-md p-6 shadow-2xl border border-[#2a2a2a]">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-[#efefef]" />
            <h2 className="text-lg font-semibold text-[#efefef] tracking-wide">No-Vig / Fair Odds</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#868686] hover:bg-[#0a0a0a] hover:text-[#efefef] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-sm text-[#868686] mb-4">
          Enter the two sides of a two-way market. We remove the bookmaker overround (vig)
          and return true fair probabilities and odds.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div>
            <label className="label">Side 1 Odds</label>
            <input
              type="text"
              value={odds1Str}
              onChange={(e) => setOdds1Str(e.target.value)}
              className="input-base font-mono"
              placeholder={oddsFormat === 'american' ? '-110' : '1.91'}
            />
          </div>
          <div>
            <label className="label">Side 2 Odds</label>
            <input
              type="text"
              value={odds2Str}
              onChange={(e) => setOdds2Str(e.target.value)}
              className="input-base font-mono"
              placeholder={oddsFormat === 'american' ? '-110' : '1.91'}
            />
          </div>
        </div>

        {result ? (
          <div className="space-y-3 rounded-lg bg-black border border-[#2a2a2a] p-4">
            <div className="flex justify-between text-sm">
              <span className="text-[#868686]">Overround (Vig)</span>
              <span className="font-mono text-[#efefef]">{formatPct(result.overround)}</span>
            </div>
            <div className="border-t border-[#2a2a2a] pt-3 grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-[#868686] mb-1 uppercase tracking-wider">Fair Prob Side 1</div>
                <div className="text-xl font-semibold text-[#efefef] font-mono">
                  {formatPct(result.fairP1)}
                </div>
                <div className="text-xs text-[#868686] mt-1">
                  Fair odds:{' '}
                  <span className="font-mono text-[#efefef]">
                    {oddsFormat === 'american'
                      ? decimalToAmerican(result.fairOdds1) > 0
                        ? `+${decimalToAmerican(result.fairOdds1)}`
                        : decimalToAmerican(result.fairOdds1)
                      : result.fairOdds1.toFixed(3)}
                  </span>
                </div>
              </div>
              <div>
                <div className="text-xs text-[#868686] mb-1 uppercase tracking-wider">Fair Prob Side 2</div>
                <div className="text-xl font-semibold text-[#efefef] font-mono">
                  {formatPct(result.fairP2)}
                </div>
                <div className="text-xs text-[#868686] mt-1">
                  Fair odds:{' '}
                  <span className="font-mono text-[#efefef]">
                    {oddsFormat === 'american'
                      ? decimalToAmerican(result.fairOdds2) > 0
                        ? `+${decimalToAmerican(result.fairOdds2)}`
                        : decimalToAmerican(result.fairOdds2)
                      : result.fairOdds2.toFixed(3)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-lg bg-black border border-[#2a2a2a] p-4 text-center text-sm text-[#868686]">
            Enter valid odds for both sides
          </div>
        )}
      </div>
    </div>
  );
}
