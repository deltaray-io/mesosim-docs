---
sidebar_label: 'Finding spreads'
sidebar_position: 13
---

# Finding Spreads

MesoSim's incremental processing of legs enables the creation of positions that meet user-defined criteria, such as received credit, 
spread width, position delta, delta-to-theta ratio, and more.

During [Entry](/job-definition-reference#entry) and [Adjustment](/job-definition-reference#adjustment), the structure is incrementally 
built by processing the legs one by one. The simulator calculates the account and position deltas (along with all other variables) at 
every step, enabling dynamic targeting of the desired state. 

The following sections will demonstrate the spread-finding process using concrete examples. 

## Fixed Width Spread

We set the first leg At The Money (using the underlying price) and specify the second leg to be 50 points away from the first. 
As the Statement (aka Strike-based) Selector's result is compared to the Strike of the contract we end up with a 50-point wide 
vertical spread.

Example run: link [FixedWidthSpread](https://portal.deltaray.io/backtests/8c5a5e0f-6b89-491b-aaee-2821025a3b74)

```json
    "Legs": [
      {
        "Name": "long",
        "Qty": "1",
        "ExpirationName": "exp1",
        "StrikeSelector": {
          "Statement": "underlying_price"
        },
        "OptionType": "Put"
      },
      {
        "Name": "short",
        "Qty": "-1",
        "ExpirationName": "exp1",
        "StrikeSelector": {
          "Statement": "leg_long_strike + 50"
        },
        "OptionType": "Put"
      }
    ]
```

## Credit targeting

We aim to receive $1 for a Put Credit Spread, with the short options having a delta of 10.
The `MidPrice` Strike Selector uses the credit received from the short options to determine the price at which the 
long options are bought. By subtracting the Credit Target from the Short Price, we target to obtain $1.5 on each spread.

Example run: [Credit Targeting](https://mesosim.io/backtests/181df5a3-209c-43c8-ac60-123f9262ace5)

```json
    "Legs": [
      {
        "Name": "short",
        "Qty": "-1",
        "ExpirationName": "exp1",
        "StrikeSelector": {
          "Delta": "10"
        },
        "OptionType": "Put"
      },
      {
        "Name": "long",
        "Qty": "1",
        "ExpirationName": "exp1",
        "StrikeSelector": {
          "MidPrice": "leg_short_price - 1.5"
        },
        "OptionType": "Put"
      }
    ]
```

## Spread based on Delta/Theta ratio

Options strategies are often defined and monitored using Greeks. Some traders like to combine Delta and Theta to obtain 
a relative measure of the directionality of their trades. 

We can construct spreads using this metric by utilizing the Complex Strike Selector. 
The short options are targeted at Delta=30, while the long options are selected in such a way that the Delta/Theta of 
the spread gets closest to 0.5.

Example run: [Delta to Theta](https://mesosim.io/backtests/e9d7323b-0cf3-42ef-ae22-6d6878736c1a)

```json
    "Legs": [
      {
        "Name": "short",
        "Qty": "-1",
        "ExpirationName": "exp1",
        "StrikeSelector": {
          "Delta": "30"
        },
        "OptionType": "Put"
      },
      {
        "Name": "long",
        "Qty": "1",
        "ExpirationName": "exp1",
        "StrikeSelector": {
          "Complex": {
            "Statement": "pos_delta / pos_theta",
            "Target": "0.5",
            "Constraints": [
              "leg_long_strike < leg_short_strike"
            ]
          }
        },
        "OptionType": "Put"
      }
    ]
```

## Spread based on Risk/Reward ratio

When dealing with vertical spreads, one important metric to consider is the Risk / Reward ratio. 
Risk / Reward ratio can be calculated by dividing the maximum potential profit by the maximum loss.

In case of a Bull Call Spread the Risk/Reward ratio can be calculated using:
```lua
risk_reward = debit_paid / ((Strike2 - Strike1) - debit_paid)
```

The following snippet selects the long leg 20 points higher than the underlying, while short leg is chosen 
to get closest to Risk/Reward=1.0

Example run: [SuperBull](https://mesosim.io/backtests/789dd3d8-cb86-4285-a27b-40f3c24e895a)

```json
"Legs": [
      {
        "Name": "long",
        "Qty": "1",
        "ExpirationName": "exp1",
        "StrikeSelector": {
          "Complex": {
            "Statement": "leg_long_strike",
            "Target": "underlying_price + 20",
            "Constraints": [
              "leg_long_strike > underlying_price"
            ]
          }
        },
        "OptionType": "Call"
      },
      {
        "Name": "short",
        "Qty": "-1",
        "ExpirationName": "exp1",
        "StrikeSelector": {
          "Complex": {
            "Statement": "(leg_long_price * leg_long_qty + leg_short_price * leg_short_qty) / ((leg_short_strike - leg_long_strike) * leg_long_qty - (leg_long_price * leg_long_qty + leg_short_price * leg_short_qty))",
            "Target": "1",
            "Constraints": [
              "leg_short_strike > leg_long_strike"
            ]
          }
        },
        "OptionType": "Call"
      }
    ]
```