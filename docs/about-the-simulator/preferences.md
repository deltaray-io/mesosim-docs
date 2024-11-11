---
sidebar_label: 'Preferences'
sidebar_position: 8
---

# Preferences

The simulator settings are included in every Backtest Job Definition in the `SimSettings` section. Given that these parameters rarely change once the user finds the setting matching his broker, we provide a way to set it globally so that every backtest can easily leverage the settings.

To access the SimSettings, please select the [Preferences](https://portal.deltaray.io/backtest/preferences) item associated with your user (top right-most dropdown):

import Preferences1 from '/img/about-the-simulator/1-Preferences-md.png';

<center>
    <img src={Preferences1} alt="Preferences" style={{width: 300, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}} />
</center>

Clicking on Preferences will show you the following Settings page:

import UserPreferences from '/img/about-the-simulator/MesoSim-User-Preferences-md.png';

<center>
    <img src={UserPreferences} alt="UserP references" style={{width: 700, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}} />
</center>

:::warning

Make sure you click save before choosing a new symbol to adjust the settings for or before navigating away from the page!

:::

**Settings for symbol** can be used to choose which symbol's settings are modified. As Index and Crypto options differ in commission structure, the user has the ability to set the desired commission structure for both asset classes.

**Initial cash** can be considered the planned capital for the simulation and is represented by the `Cash` top-level field.

**Fill Model** defines the price at which each leg is filled.

Supported modes of operation:

- At **Mid Price**: The option is filled in at the mid-point of the Bid-Ask price.
This is a good starting point, as options often can be traded around mid-price.

- At **Bid/Ask**: Long orders are filled at Ask, while Short orders are filled at Bid.
This mode is more pessimistic and can be used to replicate entries and exits where market orders are used.

**Slippage** is the “difference between the expected price of a trade and the price at which the trade is executed.”

In MesoSim, we use slippage to model the extra cost paid on top of what the FillModel dictates. For instance, when the FillModel is set to MidPrice and the calculated MidPrice is $1.0, and slippage is set to $0.1, then the actual fill price will be $1.1 for Long orders, while $0.9 will be used for short orders. `Slippage` is similarly calculated for the Bid/Ask fill model.

:::note

**Slippage** is calculated on a per-leg basis. Our experience in options trading complex structures (such as Iron Condors) can often be filled at MidPrice+$0.05. If we would like to model this behavior, we should consider that an Iron Condor has four legs and the overall slippage is $0.05. Hence the per-leg slippage should be set at $0.05/4 = $0.0125.

:::

**Commission** is the amount paid to the broker per contract traded. This value should be adjusted to match your account at your brokerage.

**Leg selection constraint** controls how contracts are chosen for each leg of a position. For a detailed description of this parameter, please refer to the [Job Definition Reference's](https://docs.deltaray.io/job-definition-reference.html) SimSettings section.

**Margin Model** defines which margin calculation to use during the simulation run. Currently, it is either turned off (*None*) or could be set to *Reg-T*. Please refer to the [Job Definition Reference's](https://docs.deltaray.io/job-definition-reference.html) respective section on more information about the supported margin models.

**Trace Collection Interval** defines the frequency of Risk Trace collection. Please refer to the [Backtest Position Monitor](https://docs.deltaray.io/backtest-position-monitor.html) for further details on the topic.
