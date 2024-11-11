---
sidebar_label: 'Share External Data'
sidebar_position: 11
---

# Share External Data

MesoSim allows users to use external data to enrich backtests.
This is done using web based, published CSV format. 
The CSV file columns will be available as variables in the backtest throughout the execution.

You can publish a CSV file via [GitHub Gist](https://gist.github.com/) or [Google Sheets](https://sheets.google.com/).
Both services require free registration. 

:::tip
We recommend using GitHub Gist as it’s easier, faster, and more convenient to use.
:::

Before we show the steps of the import, let’s first focus on the format requirements that apply to all files to be imported.

## Requirements

Here are a few key format requirements. 
We keep a complete list of requirements in the [External Data section](/job-definition-reference#external-data) of the Job Definition Reference.

- The CSV file must have a header row with the names of the columns/variables.
- The first column must be named "date "or “datetime” (not case sensitive) and can only contain date or date-time values. Format: `YYYY-MM-DD` or `YYYY-MM-DD hh:mm:ss`
- The CSV file must be publicly accessible either via Github Gist or Google Sheets's "Publish to the web" feature. 


## Publishing with Github Gist

After logging into your [GitHub account](https://gist.github.com) go to New Gist.

import NewGist from '/img/faq/external-data-new-gist.jpg';

<center>
<img src={NewGist} alt="External Data - New Gist" style={{width: 400, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}} />
</center>

Paste the content of your CSV to the window. 
If you leave the filename empty, the tool will generate one. You can create a secret or a public gist; both will work.

import GistDataEntry from '/img/faq/external-data-gist-data-entry.png';

<center>
<img src={GistDataEntry} alt="External Data - Gist Data Entry" style={{width: 600, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}} />
</center>

Instead of the default “Embed” select “Share” to get a shareable link. Copy it.


import GistShare from '/img/faq/external-data-gist-share.png';

<center>
<img src={GistShare} alt="External Data - Gist Sharable Link" style={{width: 600, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}} />
</center>

Copy the link and validate that it’s **downloading** correctly.

Alternatively, you can click the 'Raw' button, which will bring you to an URL that you can view in your browser and use in the run. 

## Publishing with Google Sheets

Alternatively, you can use Google Sheets. It is recommended though to use Gist.
If you decide to use Google Sheets, the first step is to split the CSV into columns.
Then, you need to publish the file in CSV format and use the resulting URL in the backtest.

### Split text to columns

:::tip
This step is non-optional for the correct reading of the data.
If you missed this step, you’d get the following error message when using it:
```
ExternalData.CsvUrl: First column should be named "Date" or "DateTime", but is named "......"
```
:::

This feature can be accessed in Google Sheets in two ways.

import GSheetSplitText from '/img/faq/external-data-gsheet-split-text.png';
import GSheetSplitColumns from '/img/faq/external-data-gsheet-split-columns.png';

1. Right after pasting the data a Folder icon appears; open it and select “Split text to columns”
   <center>
       <img src={GSheetSplitText} alt="External Data - Google Sheets - Split Text" style={{width: 600, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}} />
   </center>
2. If you missed splitting the text right after importing, you can still do it by selecting column A, then go to *Data / Split text to columns*.
   <center>
       <img src={GSheetSplitColumns} alt="External Data - Google Sheets - Split Columns" style={{width: 600, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}} />
   </center>

### Validation

A correctly formatted file is split into columns looks as follows:

import GSheetValidation from '/img/faq/external-data-gsheet-validation.png';

<center>
    <img src={GSheetValidation} alt="External Data - Google Sheets - Validation" style={{width: 400, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}} />
</center>

### Publishing

Now that you have the correct file format, you can publish the data. Go to File - Share - Publish to web.

import GSheetPublish from '/img/faq/external-data-gsheet-publish.png';

<center>
    <img src={GSheetPublish} alt="External Data - Google Sheets - Publish" style={{width: 400, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}} />
</center>

Select Sheet1 (instead of Entire Document) and Comma-separated values. Hit publish.

import GSheetPublish2 from '/img/faq/external-data-gsheet-publish-2.png';

<center>
    <img src={GSheetPublish2} alt="External Data - Google Sheets - Publish" style={{width: 400, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}} />
</center>

Copy the link underneath and validate whether it’s downloading correctly.
Paste the link into your browser’s address bar and verify that the csv file is downloading as expected.

import GSheetPublish3 from '/img/faq/external-data-gsheet-publish-3.png';

<center>
    <img src={GSheetPublish3} alt="External Data - Google Sheets - Publish" style={{width: 400, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}} />
</center>


## Further read
Please refer to the [Use External CSV Data](/faq/use-external-data.md) article and Job Definition Reference's [External Data Section](/job-definition-reference#external-data) on how to use the data.

