---
sidebar_position: 5
---

# Job Definition Reference

## High Level Overview

The job definition consists of six well-defined sections:

- <b>Top level fields</b>: <br/> Variables setting generic backtest-related parameters, such as:Start Date, End Date, Initial Cash, etc.
- <b>Structure</b>: <br/> Defines the combination of legs to be traded.
- <b>Entry</b>: <br/> This section defines everything related to entry:Schedule, conditions, and variables to be recorded.
- <b>Adjustments</b>: <br/>Optional field that defines how adjustments should be made if the strategy requires it. Filling this field enables the user to keep the structure balanced over various market conditions.
- <b>Exit</b>: <br/>Sets the exit criteria using Profit Target, Stop Loss, Conditional Statements, or Max Days in trade.
- <b>SimSettings</b>: <br/>Simulator-related settings where the order execution mode, slippage, initial cash, and commission can be defined.

## Full Job Definition

To better understand the upcoming sections, we provide a complete backtest job definition for reference. 
This is a synthetic example to provide an overview of all fields.

<details>
    <summary>Complete Job Definition</summary>
    ```json
    {
      "Name": "generate",
      "TemplateName": "[FULL]",
      "Start": "2021-01-01T00:00:00",
      "End": "2021-12-31T00:00:00",
      "Cash": 10000.0000,
      "Symbol": "SPX",
      "Structure": {
        "Name": "ShortStrangle",
        "Expirations": [
          {
            "Name": "exp",
            "DTE": "160",
            "Min": 140,
            "Max": 190,
            "Roots": {
              "Include": [
                "SPXW",
                "SPX"
              ],
              "Exclude": null
            }
          }
        ],
        "Legs": [
          {
            "Name": "short_call",
            "Qty": "-1",
            "ExpirationName": "exp",
            "StrikeSelector": {
              "Min": 5,
              "Max": 15,
              "BidPrice": null,
              "AskPrice": null,
              "MidPrice": null,
              "Delta": "10",
              "Gamma": null,
              "Theta": null,
              "Vega": null,
              "WVega": null,
              "Rho": null,
              "IV": null,
              "Statement": null,
              "Complex": null
            },
            "OptionType": "Call"
          },
          {
            "Name": "short_put",
            "Qty": "-1",
            "ExpirationName": "exp",
            "StrikeSelector": {
              "Min": 5,
              "Max": 15,
              "BidPrice": null,
              "AskPrice": null,
              "MidPrice": null,
              "Delta": "-1 * leg_short_call_delta",
              "Gamma": null,
              "Theta": null,
              "Vega": null,
              "WVega": null,
              "Rho": null,
              "IV": null,
              "Statement": null,
              "Complex": null
            },
            "OptionType": "Put"
          }
        ]
      },
      "Entry": {
        "Schedule": {
          "AfterMarketOpenMinutes": null,
          "BeforeMarketCloseMinutes": 30,
          "Every": "day"
        },
        "Conditions": [],
        "VarDefines": {
          "initial_theta": "pos_theta"
        },
        "AbortConditions": [
          "pos_theta < 20"
        ],
        "QtyMultiplier": "1",
        "ReentryDays": 1,
        "Concurrency": {
          "MaxPositionsInFlight": 2,
          "EntryShiftDays": 3
        }
      },
      "Adjustment": {
        "Schedule": {
          "AfterMarketOpenMinutes": null,
          "BeforeMarketCloseMinutes": 30,
          "Every": "day"
        },
        "ConditionalAdjustments": {
          "pos_delta > 5": {
            "MoveLegAdjustment": {
              "LegName": "short_call",
              "ExpirationName": null,
              "Expirations": null,
              "StrikeSelector": {
                "Min": null,
                "Max": null,
                "BidPrice": null,
                "AskPrice": null,
                "MidPrice": null,
                "Delta": "(-1 * leg_short_put_delta) / abs(leg_short_call_qty)",
                "Gamma": null,
                "Theta": null,
                "Vega": null,
                "WVega": null,
                "Rho": null,
                "IV": null,
                "Statement": null,
                "Complex": null
              }
            },
            "RemoveLegAdjustment": null,
            "AddLegsAdjustment": null
          },
          "pos_delta < -5": {
            "MoveLegAdjustment": {
              "LegName": "short_put",
              "ExpirationName": null,
              "Expirations": null,
              "StrikeSelector": {
                "Min": null,
                "Max": null,
                "BidPrice": null,
                "AskPrice": null,
                "MidPrice": null,
                "Delta": "(-1 * leg_short_call_delta) / abs(leg_short_put_qty)",
                "Gamma": null,
                "Theta": null,
                "Vega": null,
                "WVega": null,
                "Rho": null,
                "IV": null,
                "Statement": null,
                "Complex": null
              }
            },
            "RemoveLegAdjustment": null,
            "AddLegsAdjustment": null
          }
        },
        "MaxAdjustmentCount": 5
      },
      "Exit": {
        "Schedule": {
          "AfterMarketOpenMinutes": null,
          "BeforeMarketCloseMinutes": 30,
          "Every": "day"
        },
        "MaxDaysInTrade": 90,
        "ProfitTarget": "pos_theta * 160 * 0.5",
        "StopLoss": "pos_theta * 160 * 0.5 * 3",
        "Conditions": [
          "ema_10 < ema_5",
          "initial_theta > pos_theta * 4"
        ]
      },
      "Indicators": {
        "Standard": {
          "ema_5": {
            "Instrument": null,
            "Type": "EMA",
            "Param1": "5",
            "Param2": null,
            "Param3": null
          },
          "ema_10": {
            "Instrument": null,
            "Type": "EMA",
            "Param1": "10",
            "Param2": null,
            "Param3": null
          }
        }
      },
      "ExternalData": null,
      "SimSettings": {
        "FillModel": "AtMidPrice",
        "SlippageAmt": 0,
        "Margin": {
          "Model": "RegT",
          "HouseMultiplier": null,
          "RegTMode": "CBOEPermissive"
        },
        "Commission": {
          "CommissionModel": "FixedFee",
          "OptionFee": 1.5,
          "DeribitCommissionSettings": null
        },
        "PositionMonitor": {
          "TraceCollectionInterval": "Hourly"
        }
      },
      "MesoSimVersion": "__VERSION__"
    }

    ```
</details>

## Sections

### Top level fields

The following top-level fields control the backtest run-related settings:

- <b>Name</b>: <br/> The user-provided name of the backtest. If set to `GENERATE`, the simulator will create a random, memorable name for the run, similar to *YawningFish* or *GrimCat*.
- <b>TemplateName</b>: <br/> Name of the template potentially used for this run. Note that there is no strict relation between the existing templates and the name provided here. That is, nonexistent template names can also be provided.
- <b>Start</b>: <br/>A field specifying the first date and time of the simulation. Format: `YYYY-mm-ddTHH:MM:ss`
- <b>End</b>: <br/> Date field specifying the last date and time of the simulation. Format: `YYYY-mm-ddTHH:MM:ss`
- <b>Cash</b>: <br/> The amount of cash at the beginning of the simulation. It can be considered as *Planned Capital* for the trades.
- <b>Symbol</b>: <br/> Specifies the Underlying of the trade. Please refer to the “Site/Service Status” page in the portal to obtain what symbols are available.
- <b>MesoSimVersion</b>: <br/> Field used to store the execution engine’s version. This field is automatically updated on the backtest run to fill the simulator’s version.

### Structure

This section defines the combination of option contracts that are traded together to create a structure.

Each Option Contract is uniquely defined by its:
- Underlying instrument (such as SPX or BTCUSD)
- Expiration (e.g., 2022-05-18)
- Type: Put or Call
- Strike (e.g., 3500)

Currently, MesoSim doesn't support structures created for multiple Underlyings; hence the underlying instrument can be defined top-level via the `Symbol` parameter.

#### Expirations

Expiration selection is made dynamically during options trading. Similarly, during backtesting, the traded expirations are dynamically selected at a given simulation time. 
MesoSim specifies expiries by adding calendar days to the current simulation time. That is if we started our simulation back in 2008. January 2, and we specify that we are 
planning to trade options 30 days out (DTE: days till expiration), then option contracts will be selected that expire around 2008 February.


The `Structure.Expirations` define a list of expirations that are used during trading. At least one should be provided, but multiple expiries are also supported:

```json
"Expirations": [
  {
     "Name": "front",
     "DTE": "90",
     "Min": 50,
     "Max": null
  },
  {
     "Name": "back",
     "DTE": "expiration_front_dte + 60",
     "Min": 140,
     "Max": 190
  }
]
```

The above snippet defines two expirations with unique names: `front` and `back`. 
Later, during leg definitions, these names will be used to refer to expiries defined in this section 
(`Structure.Legs.ExpirationName` references `Structure.Expirations`). 
It is a good practice to keep things simple and expressive; hence front is considered a good name. 
The `Name` field is mandatory for every Expiration.The DTE field defines how many days out should an option contract be selected. 


As simulation time passes and entry is considered, the DTE statement is evaluated (by the Lua Script Engine) to find an option contract to trade. 
Note that expiry selection using DTE is not strict: the closest expiry will be chosen for the given DTE. 
Referring to other leg's DTE field is possible via the `expiration_NAME_dte` variable. 
As defined above, the `back` DTE will be calculated once the `front` 's exact DTE is found by adding 60 days to it.

The `DTE` field is mandatory for every Expiration.

The `Min` and `Max` are optional fields and are used to create a subset of the available expirations at any given time.
Using these fields, one can avoid choosing expiries that are either too far out or too close to the current simulation time. 
Defining a narrow range will result in less (or zero) trades than a loose range. 
As Min and Max are both optional, they can be turned off by setting them to `null`.

The `Roots` field enables users to filter (include or exclude) specific [OCC Option Symbols](https://en.wikipedia.org/wiki/Option_symbol), such as SPXW, SPX, 
or - in early days - SPXPM, SZP, etc.

The `Include` field doubles as a Priority List:
The order of the listed symbols is taken into account during Expiration selection. 
For example, when the following root filter is specified:

```json
    "Roots": {
      "Include": [
        "SPXW", "SPX"
      ],
      "Exclude": null
    }
```

Then, in case of multiple matching Expirations at the given DTE, the first item in the Include list will be chosen: SPXW.
When no Include has been specified, the Roots are ordered in the following manner:
- <b>SPX</b>: SPXW, SPX, lexicographic order of the rest
- <b>BTCUSD</b>: BTCD, BTCW, BTCM, BTCQ
- <b>ETHUSD</b>: ETHD, ETHW, ETHM, ETHQ

:::note[Behavioural change]

Prior to version 2.4, when multiple matching expirations were present for the given DTE, the order of the selected expirations was set at data ingestion time.

:::

:::note[Crypto note]

Deribit does not officially assign Root to the contracts yet still relies on different expiration types when calculating Fees. 
MesoSim fills the gap and creates Root similarly as it is present in Index Options. 
The last character of the Root Symbol denotes the expiration type:

- <b>BTCD / ETHD</b>: Daily
- <b>BTCW / ETHW</b>: Weekly
- <b>BTCM / ETHM</b>: Monthly
- <b>BTCQ / ETHQ</b>: Quarterly

:::

#### Legs

The section “Legs” defines option contracts to trade as part of the structure. 
Each leg has its unique `Name`, associated expiration (ExpirationName), option type (Type), target quantity (Qty), and a strike selector (StrikeSelector):

```json
"Legs": [
   {
     "Name": "short_call",
     "Qty": "-1",
     "ExpirationName": "front",
     "StrikeSelector": {
       "Min": 5,
       "Max": 15,
       "BidPrice": null,
       "AskPrice": null,
       "MidPrice": null,
       "Delta": "10",
       "Gamma": null,
       "Theta": null,
       "Vega": null,
       "WVega": null,
       "Rho": null,
       "IV": null,
       "Statement": null,
       "Complex": null
     },
     "OptionType": "Call"
   }
]
```

- **Name**: <br/>The unique name of the leg. Later, this name will be used when adjustments are made to the structure. Additionally, it makes job inspection and debugging easier.
- **Qty**: <br/>Defines the number of contracts to be traded. If negative, a short position is taken. <br/>Crypto note: In case of Equity Index Options whole numbers are allowed, while in case of Crypto Options fractional shares (such as 0.2) can be specified.
- **ExpirationName**: <br/>Reference back to the expiration defined in the Expirations section.
- **OptionType**: <br/>Defines the option type to be traded. Either Put or Call.
- **StrikeSelector**: <br/>Defines how strikes should be selected for the given leg. Currently, strikes can be selected based on type, greeks, IV, or using Statement selector. Given that we must end up selecting exactly one strike for a leg, this section must define exactly one selector.
- **Min / Max**: <br/>The Min and Max are optional fields used to create a subset of the available strikes based on the StrikeSelector chosen.They always refer to the rest of the parameters of the given StrikeSelector (Prices, greeks, or IV). As Min and Max are both optional, they can be turned off by setting them to `null`.
- **BidPrice / AskPrice / MidPrice**: <br/>Select the strike based on the associated price for the option. As the name implies, BidPrice searches for contracts where the Bid quote is closest to the specified value, while AskPrice applies the same logic to the Ask side of the quote. MidPrice is taking the mid-point between Bid and Ask. This field is helpful for hedging scenarios where one would like to specify that x% of the generated income is used for hedging.You can only use one of these variables (or one of the greek/IV options) at the same time and can combine it with the Min and Max fields if needed.For example, using SPX, use 33% of the expected premium to buy 1 long put: `BidPrice=(initial_theta * 60 * 0.33) / 100`
- **Delta / Gamma / Theta / Vega / WVega / Rho / IV**: <br/>Select strikes closest to the specified greek or IV. The most commonly used field here would be Delta, as option structures are frequently specified using this greek. As the selector is a statement, it is possible to do dynamic hedging based on the rest of the structure.You can use only one of these variables (or one of the price options) simultaneously and combine it with the Min and Max fields if needed.The WVega selector is Weighted (or Modified) Vega as described in Nassim Taleb’s Dynamic Hedging book: a “simplified one-factor model using the variance of the volatilities broken up by maturities.” It is calculated using the following formula: `sqrt(30/dte)`.
- **Statement**: <br/>Select strikes by executing the statement. The use-case for this selector is to choose legs certain points away from another leg. For example, choosing the strike 25 points away from the short_put leg can be achieved by the following statement: 
   ```json
   "Statement": "leg_short_put_strike + 25"
   ```
- **Complex**: <br/>The complex strike selector iterates through all the contracts within the given expiration and chooses the strike that best aligns with the specified criteria. 
  ```json
  "Complex": {
      "Statement": "leg_long_strike",
      "Target": "underlying_price + 20",
      "Constraints": [
             "leg_long_strike > underlying_price"
      ]
  }
  ```

  The processing begins with walking through all contracts within the specified expiration and the `Constraints` are evaluated (if they present). 
  If all Constraints evaluate to true (or no if constraints are specified) then the `Statement` is calculated and stored in the inclusion list.
  Once all contracts are processed, the `Target` statement is evaluated. Finally, the contract that is closest to the Target is selected from the inclusion list.
  The Complex StrikeSelector snippet shown above selects contracts that are 20 points higher than the At The Money strike, while ensuring that the chosen 
  contract will always have a strike price higher than the current price of the underlying. 

  :::note[Complex Strike Selector Note]
  This selector iterates over all contracts it can be used to create spreads dynamically and balance more complex structures (such as BWBs) based on custom criteria.
  For more information please refer to the FAQ/Finding spreads page.
  :::


### Entry

The Entry section is used to specify when and how entries are made. Specifying the schedule and the number of days between two entries is compulsory.

```json
"Entry": {
  "Schedule": {
    "AfterMarketOpenMinutes": null,
    "BeforeMarketCloseMinutes": 30,
    "Every": "day"
 },
 "Conditions": [],
 "QtyMultiplier": "1"
 "VarDefines": {
    "initial_theta": "pos_theta"
 },
 "ReentryDays": 1
},
```


#### Schedule

Defines the time and frequency when entry is considered. As exact timing (such as 14:10) is problematic due to early closes in exchanges, 
we have taken the route to specify the timing using relative times from Open (`AfterMarketOpenMinutes`) or Close (`BeforeMarketCloseMinutes`). 
This approach has no problem with early closes.Crypto Options (on Deribit) trade 24x7; hence there is no official close. 
In order to match the job definition with Equity Index Options, MesoSim considers UTC 00:00 as the Open and Close time for Crypto exchange.


To avoid conflict and ambiguity on entry, either `AfterMarketOpenMinutes` or `BeforeMarketCloseMinutes` should be specified. 
The Every field defines the run frequency when entry is attempted. <br/>
Valid values for this field:
- `day`: For strategies running once a day
- `mon`, `tue`, `wed`, `thu`, `fri`, `sat`, `sun`:List with an arbitrary number of days included from the week.
- `5min`: Intra-day mode, the Entry is considered every 5 minutes


:::note[Crypto note]
In case of Equity Index Options only workdays are allowed, while in case of Crypto Instrument Saturday and Sunday is also available.
:::

<b>Examples:</b>
1. Try to enter every day, 30 minutes before close:
    ```json
    "Schedule": {
       "AfterMarketOpenMinutes": null,
       "BeforeMarketCloseMinutes": 30,
       "Every": "day"
    }
    ```

2. Try to enter 30 minutes after open every Mon, Wed, Fri:
    ```json
    "Schedule": {
       "AfterMarketOpenMinutes": 30,
       "BeforeMarketCloseMinutes": null,
       "Every": "mon,wed,fri"
    }
    ```

#### Conditions

This section specifies a list of statements, any of which need to become true to enter the position. 
This field can filter trades based on the variables available via the Script Engine. 

For example, using conditions, it becomes possible to enter only on down days:

```json
"Conditions": [
   "underlying_price < underlying_today_open"
 ]
```

When multiple conditions are specified, a position is taken when any of the statements become true.

:::warning
When Conditions are evaluated, the legs are not selected. 
Therefore all the Greeks are set to 0. See AbortConditions to filter based on the Structures Greeks.
:::

#### Variable Definitions

The VarDefines section enables the user to capture the state during entry. 
Then at later stages (Adjustment and Exit), these variables become available in the Conditions section.

A practical example is to capture the whole structure’s Theta at initiation, then later compare it with the point in time Theta exits the position:

```json
"VarDefines": {
   "initial_theta": "pos_theta"
}
```

#### AbortConditions

This section specifies a list of statements; when any of which evaluates to true, the entry is aborted. 
This field is evaluated after the leg selection is complete. Therefore, it can filter trades based on the initial 
state of the structure to be taken. 

For example, using AbortConditions, it becomes possible to enter only when a  reasonable amount of Theta is gained:

```json
"AbortConditions": [
   "pos_theta < 40"
 ]
```

When multiple conditions are specified, the entry is aborted when any of the statements become true.

:::note[Version information]
This field is introduced in version 1.2.1
:::

#### QtyMultiplier

Quantity Multiplier can be used to dynamically adjust the Leg's quantity. 
It is evaluated after all the Legs are determined, therefore all the leg and position-based variables can be used in the statement.

This field can be used to scale the structure based on the NAV, dynamically. 

For more details please see the [Set Quantity Dynamically](/faq/set-qty-dynamically.md) FAQ entry.

#### Concurrency

The Entry.Concurrency section contains the settings for the parallel positions in flight. The way of concurrency is controlled using two variables:

1. `MaxPositionsInFlight`: <br/> Defines how many parallel positions should be taken at the maximum. The number of parallel positions can be less than this if the entry conditions do not enable position entry.
2. `EntryShiftDays`: <br/> This variable defines how many days should be kept between two entries.

```json
  "Entry": {
    ...
    "Concurrency": {
        "MaxPositionsInFlight": 4,
        "EntryShiftDays": 3
    }
  }
```

### Exit

Exit rules define the conditions when trades are exited. Just like Entry rules, they are mandatory in each backtest configuration. 
Currently, it is not possible to leg out from trade; at exit, the whole structure is liquidated.

#### Schedule

Exit schedules are defined the same way as Entry schedules, as described in the Entry schedule section. 
Additional to the schedule specification described in the Entry selection, it is possible to run the algorithm in intraday mode and find 
exits opportunistically by specifying a `5min` value for the Every field:

```json
"Schedule": {
      "AfterMarketOpenMinutes": 30,
      "BeforeMarketCloseMinutes": null,
      "Every": "5min"
    }
```

#### Maximum days in trade

Trades will be held for this many days unless other conditions (Profit Target, Stop Loss, Conditions) cause an early exit.

#### Profit target

The desired profit target where a trade should be exited. This field takes an expression, which allows describing complex scenarios. As an example:

```json
  "ProfitTarget": "pos_theta * 160 * 0.5" 
```

Defines a profit target as the projected total theta obtained by holding to the position for 160 days multiplied by a 50% discount factor.

:::note[Crypto Note]
In Deribit, the Theta is represented in Dollars, while the options trade in their respective Crypto Currency (BTC or ETH). 
Therefore, when calculating expected profit based on theta, the pos_theta should be divided by the underlying price to arrive at the respective cryptocurrency:
```json
  "ProfitTarget": "pos_theta/underlying_price * 160 * 0.5"
```
:::

#### Stop loss

When the loss of our overall structure reaches the value defined by the stop loss expression, an early exit will be performed. 
It is a common practice to set the StopLoss to a multiplier of the Profit Target:

```json
  "StopLoss": "pos_theta * 160 * 0.5 * 3" 
```

#### Conditions

Exit conditions are defined similarly to Entry conditions. Let’s say we want to exit when the theta potential of the position degrades to 25%. 
This could be achieved by defining a variable at entry, then using that variable in the exit condition:

```json
"Entry": {
 ...
 "VarDefines": {
   "initial_theta": "theta"
  },
  "Exit": {
 ...
 "Conditions": [
    "initial_theta > pos_theta * 4"
 ]
  }
```

### Adjustment

With the optional `Adjustment` section, keeping an open position balanced based on the criteria defined via the `ConditionalAdjustments` field is possible. 
Similar to the [Entry](#entry) and [Exit](#exit) sections, a Schedule must also be provided for the Adjustment. 
Please refer to the [Entry](#entry) and [Exit](#exit) sections’ Schedule for further details on specifying this field.

The `MaxAdjustmentCount` field controls what the maximum allowed adjustment count is. 
Every adjustment increases a counter. If the counter reaches the value specified in the MaxAdjustmentCount field, 
the following adjustment will result in position liquidation.

The following snippet contains two conditional adjustments. 
Please note that not all the fields of the StrikeSelector are shown. 
For a complete reference on StrikeSelector, please refer to the [Structure](#Structure) part of this reference.

```json
"Adjustment": {
 "Schedule": {
    "BeforeMarketCloseMinutes": 30,
    "Every": "day"
 },

 "ConditionalAdjustments": {
    "pos_delta > 5": {
       "MoveLegAdjustment": {
          "LegName": "short_call",
          "StrikeSelector": {
            "Delta": "(-1 * leg_short_put_delta) / abs(leg_short_call_qty)"
        }
      }
   },
    "pos_delta < -5": {
       "MoveLegAdjustment": {
         "LegName": "short_put",
         "StrikeSelector": {
            "Delta": "(-1 * leg_short_call_delta) / abs(leg_short_put_qty)"
          }
     }
    }
 },
 "MaxAdjustmentCount": 5
  },
```

In the above example, we create two Conditional Adjustments.

The ConditionalAdjustments section is a JSON Map (aka. dictionary), which maps keys 
(such as the `pos_delta < -5` statement) to values (such as MoveLegAdjustment structure).

In MesoSim, the keys of this map are statements executed by the [ScriptEngine](/docs/about-the-simulator/scriptengine.md). 
The statements must evaluate to bool (true or false) to signal the simulator if the adjustment should be activated or not. 
In the above example, we have two entries (key-value pairs) in the map:
- When the structure delta moves beyond 5, we move the short_call leg.
- When the structure delta moves below -5, we move the short_put leg.

The Conditional Statements in Conditional Adjustments are alphabetically ordered and evaluated before execution. 
This behavior enables moving (or removing) multiple legs in a predictable manner. 
The `[SPX-MultiLegAdjustment]` built-in template shows how to leverage Lua Comments to predictably move multiple legs 
in the user-defined order.


#### MoveLegAdjustment

During the process of leg adjustment, we look for a new strike for the given leg (specified by LegName) to bring the 
whole structure back to 0 delta. In the case of the first adjustment, this is achieved by evaluating the statement: 
```lua
  pos_delta - leg_short_put_delta
```
where `pos_delta` is the whole structure’s actual delta and `log_short_put_delta` is the put leg’s current delta.

How does this bring the structure back to 0 delta? 
It’s easiest to see via a small example:

Consider that `leg_short_put_delta=4` and `leg_short_call_delta=2`

Then the overall `pos_delta=4+2=6`.

If we consider that we will be liquidating our short_put leg and opening a new position, 
then the new position’s target delta must equal:
```lua
pos_delta-leg_short_put_delta = 6 - 4 = 2
```

Which is precisely the delta of the short call.
Why bother creating a formula if we could have just written leg_short_call_delta?

Well, this is a pedagogical example that shows how to calculate it dynamically. 
The method outlined here works even if multiple legs are considered (for instance, in the case of an Iron Condor strategy).


Move Leg Adjustment enables the user to move the leg vertically (by moving the strikes), horizontally (by moving the expiration), or both.

The mandatory StrikeSelector is used to specify the new strike, while the optional Expirations and ExpirationName can move the leg in time. 

For example:

```json
    "ConditionalAdjustments": {
      "pos_delta > 5": {
        "MoveLegAdjustment": {
          "LegName": "short_call",
          "StrikeSelector": {
            "Delta": "(-1 * leg_short_put_delta) / abs(leg_short_call_qty)"
          },
          "ExpirationName": "exp2",
          "Expirations": [
            {
              "Name": "exp2",
              "DTE": "100",
              "Min": 80,
              "Max": 120,
              "Roots": null
            }
          ]
        },
        "RemoveLegAdjustment": null,
        "AddLegsAdjustment": null
      }
    }
```


If you are unsure about your adjustment, it is best to check the result by looking at the Greeks chart or validating the variables through the Events viewer.

#### RemoveLegAdjustment

The RemoveLeg Adjustment simply exits the specified leg once the condition is met, realizing any profits or losses that occurred during the trade:

```json
"RemoveLegAdjustment": {
    "LegName": "shorts"
}
```

If the leg to be closed happens to be the last leg of the position, then, at leg close the whole position will be closed, and a new position will be considered.

RemoveLegAdjustment can be combined with MoveLegAdjustment. If the two are coupled together, then first, the RemoveLeg action will be taken, then the MoveLeg will be executed. 
This setup enables balancing the structure after the leg is removed.

#### AddLegsAdjustment

AddLegsAdjustment enables the user to add one or multiple legs. 
Add Legs Adjustment contains a set of Legs and optional `Expirations` and `AbortConditions` fields, 
so that it's functionality is matching the Position Entry.

```json
        "AddLegsAdjustment": {
          "Legs": [
            {
              "Name": "long_put",
              "Qty": "1",
              "ExpirationName": "exp2",
              "StrikeSelector": {
                "Statement": "leg_short_put_strike + 25"
              },
              "OptionType": "Put"
            }
          ],
          "Expirations":[
            {
              "Name": "exp2",
              "DTE": "100",
              "Min": 90,
              "Max": 110,
              "Roots": null
            }
          ],
          "AbortConditions": [
            "leg_long_put_price > short_put_initial_price -- wait until long_put is cheaper than short_put"
          ]
        }
```

All the AddLegAdjustment fields are matching the previously introduced described top level fields:

- <b>Legs</b>: matches [Structure.Legs](#structure)
- <b>Expirations</b>: matches [Structure.Expirations](#structure)
- <b>AbortConditions</b>: matches [Entry.AbortConditions](#entry)

Being able to add and remove legs during execution enables the user to create complex algorithms where the system have 
all the means to react to changing account or position condition.

Using this feature, one can add a Put Debit Spread, Put Credit Spread, or even a Calendar when necessary.

Add Legs Adjustment can be combined with MoveLegsAdjustment and RemoveLegAdjustment. 
In case when all the adjustments are included to a ConditionalAdjustment then the execution order will be as follows:

- Remove Leg Adjustment
- Move Leg Adjustment
- Add Leg Adjustment

The following built-in templates demonstrate the Add Legs Adjustment functionality:

- SPX-AddLegAdjustment
- SPX-AddPDSAdjustment

### Indicators

In the Indicators section, the user can define technical analysis indicators (such as the Exponential Moving Average) to be used during simulation. The indicators are calculated for the given Instrument using the provided timing parameters. Currently, the only supported Instrument is the underlying index’s price.The specified indicators are represented as standard variables in the ScriptEngine. Therefore they can be used in every place where a Statement is evaluated. For example

- Entry.Conditions
- Exit.Conditions
- Adjustment’s conditions
- StrikeSelector’s Statement
- Expiry DTE Statement

The Indicators top-level field currently contains one entry: Standard.This additional indirection is planned to add Machine Learning based indicators to the simulator later, which will have different specifications than the normal, standard indicators.The Standard field is a JSON Map (aka Dictionary), which binds user-defined names to indicator specifications. The user-defined name will be used as the variable name in the ScriptEngine.Example of two indicators specified: ema_5 and ema_10

```json
  "Indicators": {
    "Standard": {
      "ema_5": {
            "Instrument": null,
            "Type": "EMA",
            "Param1": "5",
            "Param2": null,
            "Param3": null
      },
      "ema_10": {
            "Instrument": null,
            "Type": "EMA",
            "Param1": "10",
            "Param2": null,
            "Param3": null
      }
    }
  }

```

Each indicator definition has a

- Type: defines which indicator to use. See the complete list below
- Instrument: defines the data source (optional: the underlying price is used when null)
- Param1, Param2, Param3: Parameters for the specified indicator. As different indicators have different parameters, many parameters should be filled as many are required by the specified indicator.

Once the indicator is specified, it can be used as a normal variable throughout the simulation. Most indicators (such as EMA(10) above) yield one value as a result. Such indicators' value is accessible by simply using the user-defined name (e.g. ema10).Indicators, which produce multiple results (such as BBANDS, MAMA, MACD, STOCHRSI, etc) the indicator name will be taken as a prefix and the respective indicator value will be suffixed to a unique variable. For example, in case of BBANDS:

```json
 "Indicators": {
    "Standard": {
      "bbands": {
        "Instrument": null,
        "Type": "BBANDS",
        "Param1": "20",
        "Param2": "1",
        "Param3": "1"
      }
    }
  }
```

The resulting variables will become:

- bbands_lower
- bbands_middle
- bbands_upper


List of available indicators with their suffixes:

APO(fastPeriod, slowPeriod)Absolute Price OscillatorBBANDS(timePeriod, devUp, devDown)Bollinger BandsReturns: bbands_lower, bbands_middle, bbands_upperCMO(period)Chande Momentum IndicatorDEMA(period)Double Exponential Moving AverageEMA(period)Exponential Moving Average

`APO(fastPeriod, slowPeriod)`

`BBANDS(timePeriod, devUp, devDown)`

`CMO(period)`

`DEMA(period)`

`EMA(period)`

KAMA(period)Kaufman’s Adaptive Moving AverageMACD(fastPeriod, slowPeriod, signalPeriod)Moving Average Convergence/DivergenceReturns: macd_macd, macd_signal, macd_histMAMA(fastLimit, slowLimit)MESA Adaptive Moving AverageReturns: mama_mama, mama_famaMOM(period)Momentum IndicatorPPO(fastPeriod, slowPeriod)Percentage Price OscillatorROC(period)Rate Of ChangeRSI(period)Relative Strength IndexSMA(period)Simple Moving AverageSTOCHRSI(timePeriod, fastKPeriod, fastDPeriod)Stochastic RSIReturns: stochrsi_fast_k, stochrsi_fast_dTEMA(period)Triple Exponential Moving AverageTRIMA(period)Triangular Moving AverageTRIX(period)Triple Exponential Average

`KAMA(period)`

`MACD(fastPeriod, slowPeriod, signalPeriod)`

`MAMA(fastLimit, slowLimit)`

`MOM(period)`

`PPO(fastPeriod, slowPeriod)`

`ROC(period)`

`RSI(period)`

`SMA(period)`

`STOCHRSI(timePeriod, fastKPeriod, fastDPeriod)`

`TEMA(period)`

`TRIMA(period)`

`TRIX(period)`

TSF(period)Time Series ForecastVAR(period)VarianceWMA(period)Weighted Moving Average

`TSF(period)`

`VAR(period)`

`WMA(period)`

#### External CSV Data

Load data from the CSV file and make it available to the backtest.The ExternalData.CsvUrl allows users to bring their data and use it in the backtest.The CSV file columns will be available as variables in the backtest throughout the execution.Requirements:

- The CSV file must have a header row with the names of the columns/variables.
- The first column must be named date or datetime and can contain date or datetime values
- The rest of the columns must have unique alphabetic names that do not conflict with the simulator's internal variables
- The CSV file must be smaller than 1 MB
- The CSV file must be publicly accessible either via Github Gist or Google Sheets's "Publish to the web" feature
- Github Gist is preferred over Google Sheets because it is faster to load

Behavior:If the first column contains only a date (no time), then the data is assumed to be sampled at EOD. Therefore, the values set for the day will be available the next day.If the first column contains a date and time, then the values will be usable after the given date and time is passed. These safety measures ensure that no Lookahead Bias is introduced to the simulation.

The system caches the CSV file for 30 seconds between validations and downloads to avoid excessive requests. After changing the content of the uploaded file, you need to wait for the caching to expire to see new values.

Further references:

- The `[SPX-ExternalData-Csv]` template demonstrates the usage of this feature
- Please see the External Data FAQ Article for more information.

#### SimSettings

The simulation-related settings, such as Fill Model, Slippage and commission, are located in the SimSettings object. 

Note: The user's preferences have a Settings Page to set the majority of the SimSettings fields and will be applied to any templated run initiated by the web interface.

SimSettings definition:

```json
  "SimSettings": {
    "FillModel": "AtMidPrice",
    "SlippageAmt": 0,
    "Margin": {
      "Model": "RegT",
      "HouseMultiplier": null,
      "RegTMode": "CBOEPermissive"
    },
    "Commission": {
      "CommissionModel": "FixedFee",
      "OptionFee": 1.5
    },
    "PositionMonitor": {
      "TraceCollectionInterval": "Hourly"
    },
    "LegSelectionConstraint": "FullyUnique"
  },

```


Margin (new in version 2.8):Margin field controls the margin calculation used during the simulation.The Reg-T margin model enables the calculation and capturing of the margin requirement of complex options positions based on CBOE's Margin Manual. The margin requirement for each position is calculated in every simulation step and made accessible to the user through the pos_margin variable. The sum of all position margins is used to calculate the account margin, which is provided by the acc_margin variable.The PM-Like margin model tries to approximate brokerages' Portfolio Margin mode by projecting the Risk Graph's T+0 line to the user-specified boundaries (haircuts). The Portfolio Margin calculation is a highly complex subject and brokerages do not fully disclose their calculations, therefore the calculated margin using this mode is only an approximate.SimSettings.Margin.Model:When SimSettings.Margin set to null or SimSettings.Margin.Model set to "None" , no margin calculation is performed, and the margin variables will not be populated. When set to "RegT" margin calculations are executed based on CBOE's Margin Manual. When set to "PMLike", then margin calculations are done using T+0 Risk Graph.

SimSettings.Margin.HouseMultiplier:Reg-T Margin enables Brokers to increase the margin requirement for positions.Additionally, sometimes PM requirements are increased by the brokerage.The SimSettings.Margin.HouseMultiplier variable enables users to model the heightened margin requirements set by brokers by multiplying the margin calculation's result with the user-provided multiplier. The default value is 1.0.SimSettings.Margin.RegTMode:CBOE's Reg-T manual defines two calculation modes for complex options positions:1) CBOEVanilla: The margin requirement is calculated by the predefined rules2) CBOEPermissive: The vanilla margin calculation's result is reduced by the proceeds of the short sales of complex positions' legs whenever the Margin Manual allows.Based on our experience, the brokers tend to use the Permissive mode with a House Multiplier of 1.2-1.5 based on their current risk assessment.

SimSettings.Margin.PMConfig:This field enables setting the upper and lower bounds for the PM Approximation. The highest PnL drop within this range is used to determine the PM requirement:

```json
"PMConfig": {
  "LowerBoundPct": 10,
  "UpperBoundPct": 10
}
```

Please refer to the Margin Report page to see how the captured results can be interpreted.

Commission:In case of Index Equity Options (SPX, RUT) the FixedFee Commission Model is suggested.

With the FixedFee model each contract traded will be charged with a commission specified in the OptionFee field.

In the case of Crypto Options (BTCUSD and ETHUSD) the DeribitFeeModel is can be used:

```json
  "SimSettings": {
    "FillModel": "AtMidPrice",
    "SlippageAmt": 0,
    "Commission": {
      "CommissionModel": "Deribit",
      "OptionFee": null,
      "DeribitCommissionSettings": {
        "MakerFeePctPerContract": 0.03,
        "TakerFeePctPerContract": 0.03,
        "MaxFeePctPerContract": 12.5,
        "DeliveryFeePctPerContract": 0.015,
        "WaiveBuySellComboOneSide": true,
        "WaiveDailyOptionsDeliveryFees": true
      }
    },
    "LegSelectionConstraint": "UniqueInPosition"
  }
```

The defaults of this commission setting reflect Deribit's Fees at the time of writing (2023-03-15), but the user is free to change it. The Maker/Taker fees, Max Fee and Delivery fees are described in Deribit's website in detail.

The WaiveBuySellComboOneSide parameter models the discounted commission structure, where the cheapest part of the combo order (which has both long and short legs) is waived. This can be turned off as the user might simulate complex structures, which Deribit doesn't recognize.

Similarly, WaiveDailyOptionsDeliveryFees parameter controls that Fees are waived when Daily Options are kept until expiration. This can be switched off to future-proof the commission as these discount might be not offered by Deribit in the future.

The FeeModel parameter controls how fills are calculated for every entry, exit and NAV calculation: - AtBidAsk provides a pessimistic approach to fills - AtMidPrice is filling in the mid-point of the Bid-Ask spread.Fills close to MidPrice with some slippage are often achievable in liquid markets, such as SPX.

Slippage is the exact amount applied per contract if specified.

LegSelectionConstraint controls how contracts are chosen for each leg of a position. When set to FullyUnique (default), then each leg of every position must be unique.This holds true for position initiation and adjustment as well. In this behavior, if the StrikeSelector selects a contract that is already in use by another position, then the next closest contract is selected.The UniqueInPosition is less restrictive than FullyUnique:Contracts for legs can be shared across multiple positions, but within a position, each leg must remain unique. This restriction holds true for entry and adjustments as well.The None option enables the least restrictive mode of operation:it allows strike sharing within and across positions. When enabled, entries and adjustments can re-use strikes from existing legs (that is: two legs can end up in the same contract).  Please note that when an offsetting position is made, it is not closing the affected leg, but the two legs are tracked as separate entities.Remark: UniqueInPosition is introduced in Version 2.6, while None is introduced in Version 2.7. Prior versions always used (the now default) FullyUnique.


PositionMonitor

The trace collection interval can be specified via the PositionMonitor settings:

```json
"PositionMonitor": {
  "TraceCollectionInterval": "Hourly"
}
```

Valid values for TraceCollectionInterval:

- Off       :  Fastest
- Daily   : Fast
- Hourly : Most resource intensive

Please refer to the Backtest Position Monitor article for a complete description of the subject.