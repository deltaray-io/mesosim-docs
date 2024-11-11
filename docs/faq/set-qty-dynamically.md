---
sidebar_label: 'Set Qty Dynamically'
sidebar_position: 4
---

# Set Qty Dynamically
As the account size grows by incurring profits during trading it is useful to adjust the position sizing based on the 
increased (or decreased) capital.

Since MesoSim version 2.9.5 it is possible to easily scale the structures by leveraging the `initial_cash`, `nav` 
variables and the [Entry.QtyMultiplier](/job-definition-reference#qtymultiplier) field.

## Scaling Legs Quantities based on NAV
The `initial_cash` is the initially specified Cash for the job, while the `nav` represents the current 
Net Asset Value (Cash + Positions) at any given point in time. Dividing nav by initial_cash represents 
the scaling factor of our strategy. The result of the division can be a fractional number, potentially below 1. 

To adjust this fractional number to meet options quantity requirements we can leverage the `floor` and `max` Lua functions.

:::tip
More details about this methodology can be found in the *Scaling methodology before version 2.9.5* section below.
:::

```json
  "Entry": {
    "Schedule": {
      "BeforeMarketCloseMinutes": 30,
      "Every": "day"
    },
    ...
    "QtyMultiplier": "floor(max(1, nav/initial_cash))"
  },
```

## Scaling Stop Loss and Profit Targets
Besides setting the Qty dynamically, it is essential to scale the StopLimit and ProfitTarget (if they exist). 
The same method can be applied:

```json
  "ProfitTarget": "1000 * floor(max(1, nav/initial_cash))"
  "StopLoss": "2 * 1000 * floor(max(1, nav/initial_cash))"
```

## Scaling methodology before version 2.9.5

:::warning
This s explains how scaling was possible prior to MesoSim v2.9.5.
It is kept here for reference as it might help the readers to better understand the scaling concept.
:::

Strategies that perform well will reach a point where the trade capital is doubled over time. 
The user might want to scale/increase the traded quantity for the structure when that point is reached. 
Such behavior can be achieved by leveraging the nav variable while specifying the quantity (see rows 2 and 10):

```json
{
  "Cash": 10000.0000,
  ...
  "Structure": {
  "Name": "ShortStrangle",
     ...
     "Legs": [
     {
         "Name": "upper_long",
         "Qty": "1 * floor(max(1, nav/initial_cash))",
         "ExpirationName": "160dte",
        ...
```

The formula `1 * floor(max(1, nav/initial_cash)` instructs the script engine to take the current 
Net Asset Value (Cash + Positions if any) and divide it by the initial cash amount (10000). 
At the start of the execution, the division will yield 1, and later as trades progress, it will go above or beyond 1. 

Since fractional shares are not supported, and the minimal tradable amount is 1, we calculate the quantity by first 
taking the largest value of (maximum) [1 and the result of division]. 

Taking the maximum ensures that we always have at least 1 contract to trade, even if our NAV decreases below the 
initial 10000 amount.

If the capital has grown beyond 10000, the max function will still take the largest value (e.g., NAV increased to 11000, 
then `max(1, nav/initial_cash)` will yield 1.1). The largest value might or might not be a round number (integer). 
Hence, we apply the floor Lua function to round it to the closest integer less than or equal to that number.

:::note[Crypto note]
The rounding described in the above example is required for Index Options (SPX), but it is not necessary for 
Crypto Options (BTCUSD and ETHUSD) as the crypto instruments support fractional trading.
:::
