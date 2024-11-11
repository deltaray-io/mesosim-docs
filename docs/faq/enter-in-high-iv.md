---
sidebar_label: 'Enter in a High-IV environment'
sidebar_position: 10
---

# Enter in High-IV environment

:::note[New with Version 2.0!]
:::

MesoSim exposes IV Rank and IV Pct variables via the ScriptEngine. 
These variables can be used to control the timing of the Entry, Exit, and Adjustments. 
Both variables are calculated using the 30 DTE ATM Put contracts with the lookback of one calendar year.

The built-in job `[ShortPut-HighIV]` provides an example of entering the trades when the IVRank is considered to be high (>50).

Associated variables in [ScriptEngine](/about-the-simulator/scriptengine.md):
- underlying_iv_rank
- underlying_iv_pct
