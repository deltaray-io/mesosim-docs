---
sidebar_label: 'Add Randomness to Entries'
sidebar_position: 7
---

# Add Randomness to Entries
Once a Strategy is built, it makes sense to test its robustness. 

This can be done in various ways: Doing sensitivity analysis on ProfitTargets, StopLosses, and DTEs. 

One additional way is to delay (or skip) the Entries, *sometimes*. 

Delaying the Entries can be achieved by specifying `Entry.Conditions` that can gate the entries randomly:

```json
    "Entry": {
     "Schedule": {
       "AfterMarketOpenMinutes": null,
       "BeforeMarketCloseMinutes": 30,
       "Every": "day"
     },
     "Conditions": [
            "random(0,1)"
     ],
```

`random(0,1)` uses Lua’s random function to draw a number at each potential entry from the {0, 1} “bucket". 
As random uses normal distribution, there is a 50% chance that either number will be drawn. 
When the number returned by random is 0, the entry will be rejected. 
When random returns 1, the entry will be allowed.

