---
sidebar_label: 'Variables'
sidebar_position: 2
---

# Variables

MesoSim exposes the following Variables, which can be used in expressions.

You can find the list of available variables in the Job Editor.

The range of available Variables was significantly updated with MesoSim 2.0; if you want to know more about the specific changes, please read the Backward Incompatible Changes section of our [Release Notes](https://docs.deltaray.io/release-notes.html).

import Variables from '/img/about-the-simulator/variables.png';

<center>
    <img src={Variables} alt="Variables" style={{width: 800, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}} />
</center>

> List of available variables

Note that you can see the **available constants and their values** in a backtest under the **Events** tab by opening up row details using the arrow on the left-hand side:

import Variables2 from '/img/about-the-simulator/5-Available-Constants-and-their-Values-2.png';

<center>
    <img src={Variables2} alt="Variables" style={{width: 800, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}} />
</center>

> Available Constants and their Values

## Expiration related variables

- `expiration_<expiration_name>_dte`

## Leg related variables

- `leg_<leg name>_delta`
- `leg_<leg name>_gamma`
- `leg_<leg name>_theta`
- `leg_<leg name>_vega`
- `leg_<leg name>_wvega`
- `leg_<leg name>_rho`
- `leg_<leg name>_pnl`
- `leg_<leg name>_qty`
- `leg_<leg name>_dit`
- `leg_<leg name>_price`
- `leg_<leg name>_strike`
- `leg_<leg name>_iv`

Where `<leg name>` should be replaced with the respective leg’s name.

## Position variables

- `days_in_trade`
- `profit_target`
- `stop_loss`
- `pos_pnl`
- `pos_delta`
- `pos_gamma`
- `pos_theta`
- `pos_vega`
- `pos_wvega`
- `pos_rho`

## Account variables

- `nav`
- `pos_in_flight`
- `acc_delta`
- `acc_gamma`
- `acc_theta`
- `acc_vega`
- `acc_wvega`
- `acc_rho`

## Underlying variables

- `underlying_price`
- `underlying_today_open`
- `underlying_prevday_close`
- `underlying_iv`
- `underlying_iv_rank`
- `underlying_iv_pct`
- `underlying_hv`

