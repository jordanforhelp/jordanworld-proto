import { useState, useMemo } from 'react';
import { BrainCircuit, Scale } from 'lucide-react';
import { InputsPanel } from './components/InputsPanel';
import { SummaryCards } from './components/SummaryCards';
import { BankrollChart } from './components/BankrollChart';
import { NoVigModal } from './components/NoVigModal';
import {
  calculateKelly,
  parseOdds,
  americanToDecimal,
  impliedProbability,
  type OddsFormat,
} from './lib/calculations';

export default function App() {
  const [bankroll, setBankroll] = useState(20);
  const [oddsFormat, setOddsFormat] = useState<OddsFormat>('american');
  const [oddsInput, setOddsInput] = useState('+110');
  const [winProbPct, setWinProbPct] = useState(52);
  const [minStake, setMinStake] = useState(0.5);
  const [noVigOpen, setNoVigOpen] = useState(false);

  const decimalOdds = useMemo(() => {
    const parsed = parseOdds(oddsInput, oddsFormat);
    if (parsed === null) return null;
    return oddsFormat === 'american' ? americanToDecimal(parsed) : parsed;
  }, [oddsInput, oddsFormat]);

  const result = useMemo(() => {
    if (!decimalOdds || decimalOdds <= 1 || bankroll <= 0) return null;
    const p = winProbPct / 100;
    if (p <= 0 || p >= 1) return null;
    return calculateKelly({
      bankroll,
      decimalOdds,
      winProbability: p,
      minStake,
    });
  }, [bankroll, decimalOdds, winProbPct, minStake]);

  const handleDeriveImplied = () => {
    if (decimalOdds && decimalOdds > 1) {
      const implied = impliedProbability(decimalOdds) * 100;
      setWinProbPct(Math.round(implied * 10) / 10);
    }
  };

  // Chart runs whenever we have valid odds + probability (even negative EV)
  const chartEnabled =
    !!decimalOdds &&
    decimalOdds > 1 &&
    bankroll > 0 &&
    winProbPct > 0 &&
    winProbPct < 100;

  return (
    <div className="min-h-screen bg-black">
      {/* Ambient glow (subtle, matching jordanworld.co) */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-[20%] -left-[15%] w-[55vw] h-[55vw] rounded-full bg-[radial-gradient(circle,rgba(134,134,134,0.06)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(26,42,108,0.08)_0%,transparent_70%)] blur-3xl" />
      </div>

      {/* Header */}
      <header className="border-b border-[#2a2a2a] bg-black/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#2a2a2a] bg-[#0a0a0a]">
              <BrainCircuit className="h-5 w-5 text-[#efefef]" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-[#efefef]">
                Bankroll IQ
              </h1>
              <p className="text-[0.65rem] text-[#868686] uppercase tracking-[0.15em] -mt-0.5">
                Micro-bankroll stake optimizer
              </p>
            </div>
          </div>
          <button
            onClick={() => setNoVigOpen(true)}
            className="btn-ghost"
          >
            <Scale className="h-4 w-4" />
            <span className="hidden sm:inline">No-Vig Tool</span>
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left column — inputs */}
          <div className="lg:col-span-4">
            <InputsPanel
              bankroll={bankroll}
              setBankroll={setBankroll}
              oddsFormat={oddsFormat}
              setOddsFormat={setOddsFormat}
              oddsInput={oddsInput}
              setOddsInput={setOddsInput}
              winProbPct={winProbPct}
              setWinProbPct={setWinProbPct}
              minStake={minStake}
              setMinStake={setMinStake}
              onDeriveImplied={handleDeriveImplied}
            />

            {/* Quick tip */}
            <div className="mt-4 rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] p-4 text-xs text-[#868686] leading-relaxed">
              <strong className="text-[#efefef]">Micro-bankroll tip:</strong> With a $20 roll,
              prefer Quarter Kelly. Full Kelly is aggressive and can wipe out small bankrolls
              quickly. Always require a genuine edge (your true win % &gt; implied).
            </div>
          </div>

          {/* Right column — outputs */}
          <div className="lg:col-span-8 space-y-6">
            <SummaryCards
              result={result}
              bankroll={bankroll}
              minStake={minStake}
              decimalOdds={decimalOdds}
            />

            <BankrollChart
              bankroll={bankroll}
              decimalOdds={decimalOdds ?? 0}
              winProbability={winProbPct / 100}
              enabled={chartEnabled}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-10 pt-6 border-t border-[#2a2a2a] text-center text-xs text-[#868686]">
          <p>
            Kelly f* = (p·b − q) / b · EV = p·odds − 1 · Built for sports bettors with real-world
            min-stake constraints.
          </p>
        </footer>
      </main>

      <NoVigModal
        open={noVigOpen}
        onClose={() => setNoVigOpen(false)}
        oddsFormat={oddsFormat}
      />
    </div>
  );
}
