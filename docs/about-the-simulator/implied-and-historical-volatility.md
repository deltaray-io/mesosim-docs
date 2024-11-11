---
sidebar_label: 'Implied and Historical Volatility'
sidebar_position: 4
---

# Implied and Historical Volatility

The simulator provides key volatility metrics related to the underlying for every simulation run. These volatility metrics are accessible via the following variables:

- `underlying_hv`
- `underlying_iv`
- `underlying_iv_pct`
- `underlying_iv_rank`

All calculated metrics are cross-checked and validated against values from major trading platforms like [Interactive Brokers](https://interactivebrokers.com), [TD Ameritrade](https://www.tdameritrade.com), and [TastyTrade](https://tastytrade.com/). Our calculations match these platforms over 95% of the time.

## Historical Volatility

Historical Volatility is calculated by looking back 30 calendar days and taking the log returns of close prices for each day. Using these prices, we calculate the standard deviation (square root of variance) and multiply by the square root of trading days (252):

```csharp
stdDev = Sqrt(logReturns.Sum(r => Pow(avg - r, 2)) / (logReturns.Count));
underlying_hv = Sqrt(252) * stdDev;
```

:::info

Historical volatility is not updated intraday, as it relies on close prices.

:::

## Implied Volatility

The overall implied volatility for the underlying is calculated using the following options criteria:

- **Option Types**: Put only
- **Expirations**: Closest to 30 days out at any given time
- **Strikes**: Closest to the underlying (ATM)

The calculation filters out outliers and low-liquidity data to ensure realistic measures of implied volatility.

### IV Rank and Percentile

IV Rank and Percentile are calculated based on a 1-year look-back period:

- Find the period's `high` and `low` overall implied volatility.
- Count the `total` days and the days when overall implied volatility is `under` the current level.

```csharp
underlying_iv_rank = ((price.ImpliedVolatility - low) / (high - low)) * 100;
underlying_iv_pct = (under / total) * 100;
```

All implied volatility metrics are updated intraday.

:::warning

**Crypto Notes**:
1. MesoSim’s Implied Volatility is calculated internally and not sourced from [Deribit's DVOL](https://insights.deribit.com/exchange-updates/dvol-deribit-implied-volatility-index/).
2. For Historical Volatility calculations, End of Day is set to 00:00 UTC.

:::