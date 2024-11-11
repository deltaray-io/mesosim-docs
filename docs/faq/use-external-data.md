---
sidebar_label: 'Use External Data'
sidebar_position: 12
---

# Use External Data

Once you [shared your data](/faq/share-external-data.md) in Github Gist or Google Sheets it can be used in MesoSim.

All you need to do is to fill out the ExternalData structure in the backtest. For example:
```json
  "ExternalData": {
	"CsvUrl": "https://gist.githubusercontent.com/tibkiss/54f9c01c6d569d6e78a1a9b23e59de68/raw/fcda115c21c9d0abaf9aea9c8513cb0bb307a2a5/mesosim-SPX-ExternalData-Template.csv"
  },
```

As soon as it is included in your job definition you can click Validate to read and validate the file.
The loaded variables are shown on the right-hand side of the editor under External Data:

import JobWithExternalData from '/img/faq/job-with-external-data.png';

<center>
<img src={JobWithExternalData} alt="MesoSim Job With External Data" style={{width: 600, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}} />
</center>

Once it is loaded, the CSV Columns are represented as variables and can be used in any Statement, 
as shown with the `Exit.Conditions` field.

For a full example please take a look at the built-in template: `[SPX-ExternalData-Csv]`

Refer to the Job Definition Reference's [External Data section](/job-definition-reference#external-csv-data) and the 
[Share External Data](/faq/share-external-data.md) articles for more information.
