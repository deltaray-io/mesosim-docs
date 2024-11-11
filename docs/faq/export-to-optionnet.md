---
sidebar_label: 'Export to OptionNet Explorer'
sidebar_position: 8
---

# Export to OptionNet Explorer

One key feature of MesoSim is its ability to export to [OptionNet Explorer](https://www.optionnetexplorer.com/).

## Demonstration video
<center>
    <iframe width="100%" style={{"aspect-ratio": "16 / 9"}} 
        src="https://www.loom.com/embed/d498e3c964d74054b5a58def5bfc672e?sid=954a8caa-0471-4017-9e71-7f99e9c7f01b"/> 
</center>

## Steps

To download the extract which can be imported to OptionNet you need to select the 'Export to ONE' menu item:

import ExportToOne from '/img/faq/export-to-one.png';

<center>
    <img src={ExportToOne} alt="Export to OptionNet Explorer" style={{width: 400, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}} />
</center>


Once you have obtained the extract use the 'Import' menu in OptionNet and select the 'Think or Swim' format with Time Zone set to UTC.

import OneImport from '/img/faq/one-import.png';

<center>
    <img src={OneImport} alt="Import in OptionNet Explorer" style={{width: 800, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}} />
</center>

Clicking on Next brings up the import window where you need to Link the related trades together.

To find the related trades, please check the 'Type' field, which contains trade ids prefixed with T. Every row with the same number should be selected at once (use shift + click) and linked (use F5). 
Proceed to incrementally select and link together the trades until all are linked together.

import OneLinkTrades from '/img/faq/one-link-trades.png';

<center>
    <img src={OneLinkTrades} alt="Link trades in OptionNet Explorer" style={{width: 800, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}} />
</center>

After all the trades are linked click Next and OptionNet will start importing the trades. 
It can take a while until it finishes as it needs to download all the historical data related to the trades executed.

To speed things up, you can leverage Ron Bertino's ([Trading Dominion](https://tradingdominion.com)) 
[mesosim-one-import](https://github.com/tradingDominion/mesosim-one-import) auto hotkey tool. 