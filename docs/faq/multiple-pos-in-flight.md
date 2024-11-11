---
sidebar_label: 'Have multiple position in flight'
sidebar_position: 9
---

# Have multiple positions in flight

:::tip[New with Version 2.0!]
:::

It's a common practice both for equity and options trading strategies to spread out the entry so that the chance that we go ‘all-in’ 
with a wrong price is minimized.

The process is simple: 
divide the investment amount into equal parts and make an entry for each part by waiting some time after the previous 
entry (shifting the entry). Some trading communities call this type of entry *Campaign Mode*; 
others might refer to it as a specialized [Dollar Cost Averaging](https://en.wikipedia.org/wiki/Dollar_cost_averaging).

It is easy to see that having multiple positions in flight is beneficial during simulation:
The chance of hitting one lucky path is minimized. A robust trading strategy will show a smoother equity curve, 
while a strategy with no alpha will degrade quickly because other positions will be less lucky.

:::note
Having multiple positions in flight comes with a cost: simulation time.
:::

Instead of walking through 1 set of time-series, we multiply the number of data points used by the parallel position count. 
Having extended simulation time reduces productivity.

:::tip
Therefore, we suggest that MesoSim users leverage the Multiple Positions in flight feature at the end of their research: 
Once a reasonable strategy is found, it makes sense to validate using this feature, but having this turned on in every 
backtest will increase execution speed.
:::

Currently, MesoSim enables up to 10 parallel positions. 
If you would like to use more than 10 Positions in flight please consider our [Institutional Plan](https://mesosim.io/subscription/manage/)


To enable multiple requests in flight, please fill out the [Entry.Concurrency](/job-definition-reference#entry) field in the job definition. 
An example is provided in the built-in `[Strangle-Campaign]` strategy.

