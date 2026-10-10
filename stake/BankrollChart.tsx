import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { simulateBankrollTrajectory, formatUSD } from '../lib/calculations';

interface BankrollChartProps {
  bankroll: number;
  decimalOdds: number;
  winProbability: number;
  enabled: boolean;
}

export function BankrollChart({
  bankroll,
  decimalOdds,
  winProbability,
  enabled,
}: BankrollChartProps) {
  const data = useMemo(() => {
    if (!enabled || bankroll <= 0 || decimalOdds <= 1 || winProbability <= 0) {
      return [];
    }
    return simulateBankrollTrajectory(bankroll, decimalOdds, winProbability, 50);
  }, [bankroll, decimalOdds, winProbability, enabled]);

  if (!enabled || data.length === 0) {
    return (
      <div className="card p-8 h-80 flex items-center justify-center text-[#868686] text-sm">
        Enter valid odds and win probability to run trajectory simulation
      </div>
    );
  }

  const finalQ = data[data.length - 1]?.quarterKelly ?? bankroll;
  const finalH = data[data.length - 1]?.halfKelly ?? bankroll;
  const finalF = data[data.length - 1]?.flat ?? bankroll;

  return (
    <div className="card p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div>
          <h3 className="text-sm font-semibold text-[#efefef] tracking-wide">Bankroll Trajectory Simulator</h3>
          <p className="text-xs text-[#868686] mt-0.5">
            50-bet Monte-Carlo path (seeded) · same edge each bet
          </p>
        </div>
        <div className="flex gap-4 text-xs font-mono">
          <span className="text-[#efefef]">Q: {formatUSD(finalQ)}</span>
          <span className="text-[#868686]">H: {formatUSD(finalH)}</span>
          <span className="text-[#5a5a5a]">Flat: {formatUSD(finalF)}</span>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
            <XAxis
              dataKey="bet"
              tick={{ fill: '#868686', fontSize: 11 }}
              axisLine={{ stroke: '#2a2a2a' }}
              tickLine={{ stroke: '#2a2a2a' }}
              label={{ value: 'Bet #', position: 'insideBottomRight', offset: -5, fill: '#868686', fontSize: 11 }}
            />
            <YAxis
              tick={{ fill: '#868686', fontSize: 11 }}
              axisLine={{ stroke: '#2a2a2a' }}
              tickLine={{ stroke: '#2a2a2a' }}
              tickFormatter={(v) => `$${v}`}
              width={55}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0a0a0a',
                border: '1px solid #2a2a2a',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              labelStyle={{ color: '#868686' }}
              formatter={(value: number, name: string) => [
                formatUSD(value),
                name === 'quarterKelly' ? 'Quarter Kelly' : name === 'halfKelly' ? 'Half Kelly' : 'Flat 2%',
              ]}
              labelFormatter={(label) => `After bet ${label}`}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }}
              formatter={(value) =>
                value === 'quarterKelly' ? 'Quarter Kelly' : value === 'halfKelly' ? 'Half Kelly' : 'Flat 2%'
              }
            />
            <Line
              type="monotone"
              dataKey="quarterKelly"
              stroke="#efefef"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#efefef' }}
            />
            <Line
              type="monotone"
              dataKey="halfKelly"
              stroke="#868686"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#868686' }}
            />
            <Line
              type="monotone"
              dataKey="flat"
              stroke="#5a5a5a"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#5a5a5a' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
