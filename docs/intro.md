---
sidebar_position: 1
---

# Introduction

## Overview

<b>Welcome to MesoSim</b>, the advanced option strategy backtesting service.
MesoSim was created to test option strategies using a low-code approach.

<center>
<iframe width="100%" style={{"aspect-ratio": "16 / 9"}} src="https://www.youtube.com/embed/W8lPRKjq-Dk"/>
</center>

<hr/>

## Features
- Backtest multi-leg Option Strategies in Index and Crypto Options
- Live Trading of Strategies via [MesoLive](https://docs.mesolive.io)
- Define legs using Greeks, IV, Prices, or custom statements
- Define entry, exit, and adjustment logic via algorithmically defined conditions
- Test strategies by leveraging 5 minutes resolution options data on SPX (from 2005), RUT (from 2012), BTCUSD and ETHUSD (from 2019)
- Accurate execution modeling backed by two order fill models and slippage definition 
- Strategy performance analytics using risk metrics and visualization of NAVs and Greeks
- Export runs to OptionNet Explorer for further modeling and analysis
- Multiple positions in flight, aka Campaign mode
- Indicator support
- Historical and Implied Volatility, IV Rank & Pct of the underlying
- Full Tearsheet as defined in QuantStats library


:::tip[Goal]

 The simulator was developed with a strong emphasis on performance so that users can perform 
 Strategy Research quickly and conveniently. 
 
:::


## Motivation
Our journey started when we tried to use state-of-the-art backtesting tools to model income options strategies. 
Most Open Source solutions take execution modeling to an extreme, which results in prolonged execution. 
Besides the performance challenges, these tools were rarely created with option trading as a key focus area; 
hence they are very difficult to use in option trading scenarios.

Leaving Open Source behind, we turned to commercial solutions. 
Some offerings helped model simple strategies, but none provided enough flexibility to simulate *theta harvesting* 
strategies appropriately. Last, we settled with the well-respected and widely used OptionNetExplorer, which, 
however (at the time of the writing), provides no automated simulation capabilities. 
We must point out that manual backtesting via OptionNetExplorer helped us tremendously to gain a better understanding 
of the strategies.

It became apparent that it’s possible to create a domain-specific language (DSL) to describe and automatically execute 
Option Trading strategies.

Leveraging extensive prior experience in backtesting solutions 
(we are PyAlgoTrade contributors, Zipline-Live authors, and QuantConnect/Lean users), 
we created MesoSim as an advanced automated backtester that provides unparalleled flexibility in Options Trading space.

