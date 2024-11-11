---
sidebar_label: 'Crypto Simulation'
sidebar_position: 5
---

# Crypto Simulation

MesoSim supports backtesting Options Trading strategies on Crypto instruments.  
The simulator models [Deribit Exchange](https://deribit.com) and has historical data sourced directly from Deribit.

The instruments (BTCUSD and ETHUSD) traded on Deribit differ slightly from Equity Index Options (SPX, RUT, etc.) traded on exchanges like CBOE as follows:

- **24x7 Trading**: Crypto options trade around the clock.
- **Inverse Options**: Options on Deribit are inverse options.
- **Complex Commission Structure**: The [commission structure](https://www.deribit.com/kb/fees) includes taker and maker fees, along with waived commissions.
- **Fractional Quantities**: Tradable quantities can be fractional.
- **Settlement Price Calculation**: Settlement price is an average of the last 30 minutes of trading of the underlying.
- **Theta Quoted in USD**: Theta is quoted in the base (USD) currency.

MesoSim implements these differences, adjusting its simulation behavior whenever crypto options are specified.

We also provide basic templates, such as Short Put, Straddle, and Butterfly, specifically for crypto options. These can serve as stepping stones for developing more complex strategies in the future.

While our advanced templates (like [Boxcar-NG](https://blog.deltaray.io/boxcar-ng-an-optimized-boxcar) and [NetZero](https://blog.deltaray.io/netzero-trade)) could theoretically apply to Crypto Options, they require adjustments and tuning to account for the unique characteristics of crypto options to become profitable strategies.

For detailed behavioral differences, refer to the relevant sections in the [Job Definition Reference](https://docs.deltaray.io/job-definition-reference.html).