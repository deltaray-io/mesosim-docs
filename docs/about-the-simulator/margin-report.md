---
sidebar_label: 'Margin Report'
sidebar_position: 6
---

# Margin Report

When Margin Calculation is enabled (using the `SimSettings.Margin` parameter) for a backtest, the per-position and account-level margin is calculated and recorded during each simulation cycle.

The Margin Report tab on the Backtest Details page offers an overview of the captured margin requirements.

import Margin from '/img/about-the-simulator/margin.png';

<center>
    <img src={Margin} alt="Margin Report" style={{width: 800, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}} />
</center>

The (stacked) bar chart displays the margin requirement for each position individually, as well as the accumulated margin displayed as Account Margin.

For each position, the Minimum, Maximum, Average, and Median statistics are calculated and presented in the table. The same statistics are calculated at the Account level.

For each position, the Return on Max Margin calculation is done with the formula:

:::info

Return On Max Margin = Position PnL at Exit / Maximum Margin During the Trade

:::

For each position's Return On Max Margin measure, the Minimum, Maximum, Average, and Median statistics are presented in the details table.

For further details on the Margin Settings, please see the [Job Definition Reference's](https://docs.mesosim.io/job-definition-reference) SimSettings section.

:::warning

Results differ from [OptionNet Explorer's](https://optionnetexplorer.com/) reported margin?  
See this [blog-post](https://blog.deltaray.io/mesosim-v28/) for additional info.

:::
