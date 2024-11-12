---
sidebar_label: 'Event Log Export'
sidebar_position: 7
---

# Event Log Export

MesoSim records its key execution steps in the Event Log stream, known as **Blotter Events**. The events recorded in Blotter are visible on the Backtest Details page under the ‘Events’ tab:

import Events from '/img/about-the-simulator/event-log.png';

<center>
    <img src={Events} alt="Events" style={{width: 800, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}} />
</center>

With MesoSim version 2.1.0, the event log can be exported, enabling users to conduct post-processing and custom analytics. The event log format is JSON, and during the download, it is compressed into a zip file for easy extraction on all platforms.

## Fields of the Event Log

```json
BlotterEvent {
 DateTime EventTime                 // The real time when the event happened
 DateTime? SimTime                  // Simulation time for the event
 BlotterEventType EventType         // See BlotterEventType for details
 string Message                     // Message associated with the event
 bool Invested                      // Boolean flag of investment state
 decimal? NAV                       // Net Asset Value
 decimal? PnL                       // The running Profit and Loss
 int TradeCnt                       // Number of trades executed so far
 int SettlementCnt                  // Number of settlements so far
 int OpenLegCnt                     // Number of open legs
 TradeEventDto? TradeEvent          // Trade information
 Dictionary<string, decimal>? Vars  // ScriptEngine’s variables
 int? PositionId                    // The ID of the position
}

BlotterEventType {
   EntrySignal,
   EntryAborted,
   ExitSignal,
   AdjustmentSignal,
   AdjustmentDetail,
   AdjustmentAborted,
   ExpirationSelected,
   LegSelected,
   VariableSet,
   IndicatorInitialized,
   IndicatorFailed,
   EntryTrade,
   ExitTrade,
   Settlement,
   PriceZero,
   StrikeNotFound,
   MissingData,
   EndOfDay,
   Start,
   Finish,
   Failed,
}

TradeEvent {
  int TradeId               // Monotonically increasing TradeId
  OptionContract Contract   // Contract associated with the Trade
  decimal Price             // Execution price for the trade
  decimal Qty               // Quantity of the trade
}

OptionContract {
  string Underlying    // Underlying symbol, such as SPX
  string Root          // The root (option class). e.g., SPX or SPXW
  OptionType Type      // Type of the option: Put or Call
  DateTime Expiration  // Expiration of the contract 
  decimal Strike       // Strike price of the contract
  int Multiplier       // Share multiplier of the contract. Defaults to 100
}
```

## Notable Event Types

- **EntrySignal**: Triggered when `Entry.Condition` is populated, and any of its statements become true.
- **EntryAborted**: Triggered when `Entry.AbortConditions` is populated, and any of its statements become true.
- **ExitSignal**: Triggered when either the max days in trade is reached or any of the exit conditions are met.
- **EndOfDay**: Triggered once daily. When the `Message` field equals `DIT=0`, it contains the initial set of variables for daily updates.
- **LegSelected**: Contains details around the log chosen by the selectors.

Post-processing of the events can be done using various tools, such as Microsoft Excel (using [PowerQuery](https://support.microsoft.com/en-us/office/import-data-from-data-sources-power-query-be4330b3-5356-486c-a168-b68e9e616f5a)), [jq](https://github.com/stedolan/jq), or Python.
