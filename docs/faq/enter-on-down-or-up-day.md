---
sidebar_label: 'Enter on Down or Up Day'
sidebar_position: 2
---

# Enter on Down or Up Day

Filtering when to enter is possible with the `Entry.Conditions` field. 
As described in the [Entry section](/job-definition-reference/#entry), the script engine can be leveraged to 
filter when to enter trades. We will be using this functionality to enter on specific days:

- <b>Down Day</b>: <br/>
  current underlying price < opening of underlying price:
  ```json
    "Entry": {
         ...
     "Conditions": [
        "underlying_price < underlying_today_open"
         ]
    }
  ```
- <b>“Very” Down Day</b>: <br/>current price < opening price < yesterday’s close:
  ```json
    "Entry": {
         ...
     "Conditions": [
        "underlying_price < underlying_today_open and underlying_today_open < underlying_prevday_close"
         ]
       }
    ```

Checking for Up Day is very simple; one needs to flip the smaller operator (`<`) to the greater operator (`>`) 
in the statements under Conditions.