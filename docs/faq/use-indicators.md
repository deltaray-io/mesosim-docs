---
sidebar_label: 'Use Indicators'
sidebar_position: 5
---

# Use Indicators

:::info[New with Version 2.0]
:::

MesoSim has built-in indicator support, which can be used to trigger entries, adjustments, and exits. 
The user can instantiate multiple indicators (in the Indicators top-level section), which become accessible as regular variables. 
The indicator variables can later be used in the `Entry.Conditions`, `Exit.Conditions` and `Adjustment` sections.

We recommend starting with the built-in `[ShortPut-EMACross]` strategy, which times the entries based on the EMA Cross strategy.

When indicators are enabled, the backtest details page contains a visual representation of the computed variables. 

import IndicatorGraph from '/img/faq/indicator-graph.png';

<center>
    <img src={IndicatorGraph} alt="Strategies Page" style={{width: 600, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}} />
</center>

<br/>

The complete list of available Indicators is displayed in the Job Editor:

import IndicatorList from '/img/faq/indicator-list.png';

<center>
    <img src={IndicatorList} alt="Strategies Page" style={{width: 600, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}} />
</center>

Please see the [Job Definition Reference / Indicators](/job-definition-reference#indicators) section for a complete reference.
