---
sidebar_label: 'Choose a Leg certain points away'
sidebar_position: 2
---

# Choose a Leg certain points away
In option trading, it is common to define structures where legs are certain “points away” (which are dollar amounts added to the strike). 

Even though we don’t find this approach very robust (as the underlying price and, therefore, the strikes are not changing linearly), 
MesoSim provides support for such a setup by using the Statement selector <br/>`"Statement": "leg_short_put_strike - 25"`.


```json
"Legs": [{
     "Name": "short_put",
     "Qty": "-1",
     "ExpirationName": "0dte",
     "StrikeSelector": {
       "Min": 4,
       "Max": 6,
       "Delta": "5",
     },
     "OptionType": "Put"
   },
   {
     "Name": "long_put",
     "Qty": "1",
     "ExpirationName": "0dte",
     "StrikeSelector": {
       "Statement": "leg_short_put_strike - 25"
     },
     "OptionType": "Put"
   },
   ...
   ]
```

For a complete example, please refer to the `[IC-0DTE]` built-in template.