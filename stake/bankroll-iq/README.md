# Bankroll IQ

**Production-ready micro-bankroll manager & optimal stake calculator** for sports bettors starting with ~$20.

Applies Wall Street quantitative methods (Kelly Criterion, Fractional Kelly, Expected Value) with real-world sportsbook constraints (minimum stake thresholds).

## Features

- **Odds converter** — American ↔ Decimal
- **Full / Half / Quarter Kelly** stake sizing
- **Flat 2% staking** comparison
- **EV calculation** with negative-EV hard block
- **Bankroll guardrail** — warns when recommended stake falls below sportsbook minimum
- **50-bet trajectory simulator** (Recharts) comparing Quarter Kelly, Half Kelly & Flat
- **No-Vig / Fair Odds tool** — remove bookmaker overround from 2-way markets
- Dark slate/emerald financial aesthetic, fully responsive

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS 3
- Recharts
- Lucide React icons

## Quick Start

```bash
cd bankroll-iq
npm install
npm run dev
```

Open http://localhost:5173

## Math Reference

**Kelly fraction**

\[
f^* = \frac{p \cdot b - q}{b}
\]

where \( b = \) decimal odds \( - 1 \), \( q = 1 - p \)

**Expected Value**

\[
EV = p \cdot \text{decimal odds} - 1
\]

**No-vig fair probability**

\[
p_{\text{fair}} = \frac{1/\text{odds}_i}{\sum 1/\text{odds}_j}
\]

## Project Structure

```
src/
  App.tsx                 # Main SPA
  components/
    InputsPanel.tsx       # Bankroll, odds, probability, min stake
    SummaryCards.tsx      # EV banner, stake cards, guardrail
    BankrollChart.tsx     # Recharts trajectory
    NoVigModal.tsx        # Fair-odds calculator
  lib/
    calculations.ts       # All quant logic (pure functions)
    utils.ts              # cn() helper
```

## License

MIT
