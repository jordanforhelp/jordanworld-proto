import { TrendingUp, TrendingDown, AlertTriangle, DollarSign } from 'lucide-react';
import { KellyResult, formatUSD, formatPct } from '../lib/calculations';
import { cn } from '../lib/utils';

interface SummaryCardsProps {
  result: KellyResult | null;
  bankroll: number;
  minStake: number;
  decimalOdds: number | null;
}

function StakeCard({
  title,
  stake,
  fraction,
  highlight,
  muted,
}: {
  title: string;
  stake: number;
  fraction: number;
  highlight?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={cn(
        'card p-4 flex flex-col gap-1 transition-all',
        highlight && 'ring-1 ring-[#efefef]/50 border-[#efefef]/30',
        muted && 'opacity-50'
      )}
    >
      <div className="text-[0.65rem] font-bold text-[#868686] uppercase tracking-[0.15em]">{title}</div>
      <div className="text-2xl font-semibold font-mono text-[#efefef]">
        {formatUSD(stake)}
      </div>
      <div className="text-sm text-[#868686] font-mono">{formatPct(fraction)} of bankroll</div>
    </div>
  );
}

export function SummaryCards({ result, bankroll, minStake, decimalOdds }: SummaryCardsProps) {
  if (!result) {
    return (
      <div className="card p-8 text-center text-[#868686]">
        Enter odds and win probability to see recommended stakes
      </div>
    );
  }

  const { isPositiveEV, expectedValue, belowMinStake, recommendedLabel, recommendedStake } = result;

  // Estimated profit if the bet wins (net profit, not including stake return)
  const profitIfWin =
    decimalOdds && recommendedStake > 0
      ? recommendedStake * (decimalOdds - 1)
      : 0;
  const lossIfLose = recommendedStake > 0 ? -recommendedStake : 0;

  return (
    <div className="space-y-4">
      {/* EV Banner */}
      <div
        className={cn(
          'card p-4 flex items-center gap-3',
          isPositiveEV
            ? 'border-[#efefef]/25 bg-[#0a0a0a]'
            : 'border-[#868686]/40 bg-[#0a0a0a]'
        )}
      >
        {isPositiveEV ? (
          <TrendingUp className="h-6 w-6 text-[#efefef] shrink-0" />
        ) : (
          <TrendingDown className="h-6 w-6 text-[#868686] shrink-0" />
        )}
        <div className="flex-1">
          <div className="font-semibold text-sm text-[#efefef]">
            {isPositiveEV ? 'Positive Expected Value' : 'Negative EV — Do Not Bet'}
          </div>
          <div className="text-xs text-[#868686] mt-0.5">
            EV = {expectedValue >= 0 ? '+' : ''}
            {(expectedValue * 100).toFixed(2)}% per unit risked
          </div>
        </div>
        <div
          className={cn(
            'text-lg font-mono font-semibold',
            isPositiveEV ? 'text-[#efefef]' : 'text-[#868686]'
          )}
        >
          {expectedValue >= 0 ? '+' : ''}
          {formatPct(expectedValue)}
        </div>
      </div>

      {/* Estimated Profit / Loss */}
      {recommendedStake > 0 && decimalOdds && decimalOdds > 1 && (
        <div className="card p-4 grid grid-cols-2 gap-4">
          <div>
            <div className="text-[0.65rem] font-bold text-[#868686] uppercase tracking-[0.15em] mb-1">
              Profit if Win
            </div>
            <div className="text-xl font-semibold font-mono text-[#efefef]">
              +{formatUSD(profitIfWin)}
            </div>
            <div className="text-xs text-[#868686] mt-0.5">
              Stake {formatUSD(recommendedStake)} @ {decimalOdds.toFixed(2)}
            </div>
          </div>
          <div>
            <div className="text-[0.65rem] font-bold text-[#868686] uppercase tracking-[0.15em] mb-1">
              Loss if Lose
            </div>
            <div className="text-xl font-semibold font-mono text-[#868686]">
              {formatUSD(lossIfLose)}
            </div>
            <div className="text-xs text-[#868686] mt-0.5">
              Full stake at risk
            </div>
          </div>
        </div>
      )}

      {/* Guardrail */}
      {belowMinStake && isPositiveEV && (
        <div className="card p-4 flex items-start gap-3 border-[#868686]/50">
          <AlertTriangle className="h-5 w-5 text-[#efefef] shrink-0 mt-0.5" />
          <div className="text-sm">
            <div className="font-medium text-[#efefef]">Bankroll Guardrail Alert</div>
            <div className="text-[#868686] mt-1">
              Bet size is below sportsbook minimum ({formatUSD(minStake)}). Rounding up
              increases bankruptcy risk on a small bankroll.
            </div>
          </div>
        </div>
      )}

      {/* Stake cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StakeCard
          title="Quarter Kelly"
          stake={result.quarterKellyStake}
          fraction={result.quarterKellyFraction}
          highlight={recommendedLabel.startsWith('Quarter')}
          muted={!isPositiveEV}
        />
        <StakeCard
          title="Half Kelly"
          stake={result.halfKellyStake}
          fraction={result.halfKellyFraction}
          highlight={recommendedLabel.startsWith('Half')}
          muted={!isPositiveEV}
        />
        <StakeCard
          title="Flat 2%"
          stake={result.flat2PctStake}
          fraction={0.02}
          muted={!isPositiveEV}
        />
      </div>

      {/* Recommendation */}
      {isPositiveEV && (
        <div className="card p-4 flex items-center justify-between border-[#efefef]/20">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-[#efefef]" />
            <span className="text-sm text-[#868686]">
              Recommended for ${bankroll.toFixed(0)} bankroll:
            </span>
          </div>
          <div className="text-right">
            <div className="text-xl font-semibold font-mono text-[#efefef]">
              {formatUSD(result.recommendedStake)}
            </div>
            <div className="text-xs text-[#868686] uppercase tracking-wider">{recommendedLabel}</div>
          </div>
        </div>
      )}
    </div>
  );
}
