---
sidebar_label: 'Add Comments to the Job'
sidebar_position: 6
---

# Add Comments to the Job

The Job Definition uses [JSON](https://en.wikipedia.org/wiki/JSON) as a data interchange format. 
JSON is relatively easy to process and easy to understand by humans. 
But it has one flaw: Commenting is not part of the standard.

On the other hand, Lua (our scripting language of choice) provides (commenting functionality)[https://create.roblox.com/docs/luau/comments]. 
Since the JobDefinition heavily relies on Lua, it becomes possible to add comments to it:

```json
    "Legs": [
       {
         "Name": "short_call",
         "Qty": "-1 -- Negative: I always wanted to try shorting options ;)",
         "ExpirationName": "160dte",
         "StrikeSelector": {
           "Min": 5,
           "Max": 15,
           "Delta": "10 -- I love number 10"
         },
         "OptionType": "Call"
       },
      ...
    ]
```
