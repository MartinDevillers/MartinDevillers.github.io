---
layout: post
title: Localizing Microsoft ReportViewer
comments: true
permalink: blog/localizing-microsoft-reportviewer/
redirect_from: /localizing-microsoft-reportviewer/
lang: en
---

Microsoft ReportViewer Control can be localized by implementing the three [IReportViewerMessages](http://msdn.microsoft.com/en-us/library/microsoft.reporting.webforms.ireportviewermessages.aspx) interfaces. However, the documentation of these interfaces lacks the original string values, which in turn makes it difficult to provide a proper translation. In this blog, a complete listing of these values and a Dutch implementation of IReportViewerMessages are presented.

## Microsoft ReportViewer

Microsoft ReportViewer is a .NET control that can be used in both Windows and Web applications to render Microsoft Reports. Unlike the name suggests, the ReportViewer does a whole lot more than just view reports. The control is capable of loading (remote) RDL files, executing its contents and rendering the end result in various formats (including HTML, Excel, Word, PDF). Once rendered, the user can interact with the control in order to pass report parameters, navigate through multipage reports and more.

![ReportViewer localized to the Dutch culture and language.](/assets/05-05-2012-dutch-reportviewer.png)
> ReportViewer localized to the Dutch culture and language.

In my current project, we embedded ReportViewer inside an ASP MVC web application. As the audience of the application is Dutch, all content, including the ReportViewer, must be localized to the Dutch culture. Unfortunately, the language packs available for ReportViewer do not include Dutch, so I had to come up with an alternative solution.

## The Good

Fortunately, Microsoft included a mechanism in the ReportViewer control which allows developers to override the default messages. This is achieved by implementing various interfaces in the parent application that utilizes ReportViewer and then passing these custom implementations to the ReportViewer control.

More specifically, these interfaces are `IReportViewerMessages`, `IReportViewerMessages2` and `IReportViewerMessages3`, which reside in the `Microsoft.Reporting.WebForms` namespace (or WinForms if you’re using that). These interfaces are essentially just collections of read-only string properties with static hardcoded values.

## The Bad

While Microsoft was graceful enough to [document](http://msdn.microsoft.com/en-us/library/microsoft.reporting.webforms.ireportviewermessages.aspx) [these](http://msdn.microsoft.com/en-us/library/microsoft.reporting.webforms.ireportviewermessages2.aspx) [interfaces](http://msdn.microsoft.com/en-us/library/microsoft.reporting.webforms.ireportviewermessages3.aspx), their documentation lacks the original values of these string properties. As a result, anyone who wants to create a meaningful translation of these properties must deduce the meaning from the property’s name and description, rather than the original value. This can be quite challenging when faced with cryptic names such as `ParameterAreaButtonToolTip`, `NullValueText` or `ClientPrintControlLoadFailed`.

## The Ugly

While the lack of original values is a nuisance, it is in no means a showstopper. Poor translations can result in the user being faced with messages that seem out of place, but the application itself will remain functional. Or so I thought:

![Input string was not in a correct format.](/assets/05-05-2012-exception.png)
> First attempt at localizing ReportViewer results in a FormatException

Most .NET developers will be familiar with this exception as it is the result of String.Format being invoked with a format string which does not match the expected objects to format. In other words, one or more of the strings which I am translating use the composite formatting feature. Without the original English values of these strings, one is left to guess which of these strings must contain formatting placeholders.

## The Solution

To overcome this problem, I decompiled the ReportViewer assembly and extracted the original string values of these properties. Below is a version of my Dutch implementation of the `IReportViewerMessages` interfaces. Each property includes the original text in English, so you could use it as a template for your own translations.

```c#
using System;
using System.Globalization;
using Microsoft.Reporting.WebForms;
 
namespace InfoSupport.SomeApplication
{
    public class DutchReportViewerMessages : IReportViewerMessages, IReportViewerMessages2, IReportViewerMessages3
    {
        #region IReportViewerMessages Members
 
        // English value: Back to Parent Report
        public string BackButtonToolTip
        {
            get { return "Terug naar het vorige rapport"; }
        }
 
        // English value: Change Credentials
        public string ChangeCredentialsText
        {
            get { return "Wijzig Rechten"; }
        }
 
        // English value: Change Credentials
        public string ChangeCredentialsToolTip
        {
            get { return "Wijzig Rechten"; }
        }
 
        // English value: Current Page
        public string CurrentPageTextBoxToolTip
        {
            get { return "Huidige Pagina"; }
        }
 
        // English value: Document Map
        public string DocumentMap
        {
            get { return "Document Map"; }
        }
 
        // English value: Show / Hide Document Map
        public string DocumentMapButtonToolTip
        {
            get { return "Toon / Verberg Document Map"; }
        }
 
        // English value: Export
        public string ExportButtonText
        {
            get { return "Exporteer"; }
        }
 
        // English value: Export
        public string ExportButtonToolTip
        {
            get { return "Exporteer"; }
        }
 
        // English value: Export Formats
        public string ExportFormatsToolTip
        {
            get { return "Exporteer Formaten"; }
        }
 
        // English value: False
        public string FalseValueText
        {
            get { return "Onwaar"; }
        }
 
        // English value: Find
        public string FindButtonText
        {
            get { return "Zoek"; }
        }
 
        // English value: Find
        public string FindButtonToolTip
        {
            get { return "Zoek"; }
        }
 
        // English value: Next
        public string FindNextButtonText
        {
            get { return "Volgende"; }
        }
 
        // English value: Find Next
        public string FindNextButtonToolTip
        {
            get { return "Volgend Resultaat"; }
        }
 
        // English value: First Page
        public string FirstPageButtonToolTip
        {
            get { return "Eerste Pagina"; }
        }
 
        // English value: Enter a valid page number
        public string InvalidPageNumber
        {
            get { return "Voer een geldig paginanummer in"; }
        }
 
        // English value: Last Page
        public string LastPageButtonToolTip
        {
            get { return "Laatste Pagina"; }
        }
 
        // English value: Next Page
        public string NextPageButtonToolTip
        {
            get { return "Volgende Pagina"; }
        }
 
        // English value: The entire report has been searched.
        public string NoMoreMatches
        {
            get { return "Het volledige rapport is doorzocht."; }
        }
 
        // English value: NULL
        public string NullCheckBoxText
        {
            get { return "Geen waarde"; }
        }
 
        // English value: Null
        public string NullValueText
        {
            get { return "Geen waarde"; }
        }
 
        // English value: of
        public string PageOf
        {
            get { return "van"; }
        }
 
        // English value: Show / Hide Parameters
        public string ParameterAreaButtonToolTip
        {
            get { return "Toon / Verberg Parameters"; }
        }
 
        // English value: Password:
        public string PasswordPrompt
        {
            get { return "Wachtwoord:"; }
        }
 
        // English value: Previous Page
        public string PreviousPageButtonToolTip
        {
            get { return "Vorige Pagina"; }
        }
 
        // English value: Print
        public string PrintButtonToolTip
        {
            get { return "Afdrukken"; }
        }
 
        // English value: Loading...
        public string ProgressText
        {
            get { return "Verwerken..."; }
        }
 
        // English value: Refresh
        public string RefreshButtonToolTip
        {
            get { return "Vernieuwen"; }
        }
 
        // English value: Find Text in Report
        public string SearchTextBoxToolTip
        {
            get { return "Zoek naar tekst binnen het rapport"; }
        }
 
        // English value: <Select a Value>
        public string SelectAValue
        {
            get { return "<Selecteer een waarde>"; }
        }
 
        // English value: (Select All)
        public string SelectAll
        {
            get { return "(Selecteer alles)"; }
        }
 
        // English value: Select a format
        public string SelectFormat
        {
            get { return "Selecteer een formaat"; }
        }
 
        // English value: The search text was not found.
        public string TextNotFound
        {
            get { return "De zoektekst is niet gevonden."; }
        }
 
        // English value: Today is {0}
        public string TodayIs
        {
            get { return "Vandaag is {0}"; }
        }
 
        // English value: True
        public string TrueValueText
        {
            get { return "Waar"; }
        }
 
        // English value: Log In Name:
        public string UserNamePrompt
        {
            get { return "Gebruikersnaam:"; }
        }
 
        // English value: View Report
        public string ViewReportButtonText
        {
            get { return "Toon Rapport"; }
        }
 
        // English value: Zoom
        public string ZoomControlToolTip
        {
            get { return "Zoom"; }
        }
 
        // English value: Page Width
        public string ZoomToPageWidth
        {
            get { return "Paginabreedte"; }
        }
 
        // English value: Whole Page
        public string ZoomToWholePage
        {
            get { return "Volledige pagina"; }
        }
 
        #endregion
 
        #region IReportViewerMessages2 Members
 
        // English value: Your browser does not support scripts or has been configured not to allow scripts.
        public string ClientNoScript
        {
            get { return "Uw browser ondersteunt geen JavaScript of deze ondersteuning is uitgeschakeld."; }
        }
 
        // English value: Unable to load client print control.
        public string ClientPrintControlLoadFailed
        {
            get { return "Het laden van het client print control is niet gelukt."; }
        }
 
        // English value: One or more data sources is missing a user name.
        public string CredentialMissingUserNameError(string dataSourcePrompt)
        {
            return "Een of meerdere databronnen missen een gebruikersnaam.";
        }
 
        // English value is different for each Rendering Extension. See comment behind each type.
        public string GetLocalizedNameForRenderingExtension(string format)
        {
            switch (format)
            {
                case "XML"   : return "XML databestand (.xml)";  // XML file with report data
                case "CSV"   : return "CSV databestand (.csv)";  // CSV (comma delimited)
                case "PDF"   : return "PDF document (.pdf)";     // PDF
                case "MHTML" : return "Webarchief (.mhtml)";     // MHTML (web archive)
                case "EXCEL" : return "Excel rekenblad (.xls)";  // Excel
                case "IMAGE" : return "Afbeelding (.tif)";       // TIFF file
                case "WORD"  : return "Word document (.doc)";    // Word
                default      : return null;
            }
        }
 
        // English value: Select a value
        public string ParameterDropDownToolTip
        {
            get { return "Selecteer een waarde"; }
        }
 
        // English value: Please select a value for the parameter '{0}'.
        public string ParameterMissingSelectionError(string parameterPrompt)
        {
            return String.Format(CultureInfo.CurrentCulture, "Selecteer een waarde voor de parameter '{0}'", parameterPrompt);
        }
 
        // English value: Please enter a value for the parameter '{0}'. The parameter cannot be blank.
        public string ParameterMissingValueError(string parameterPrompt)
        {
            return String.Format(CultureInfo.CurrentCulture, "Selecteer een waarde voor de parameter '{0}'. De parameter mag niet leeg zijn.", parameterPrompt);
        }
 
        #endregion
 
        #region IReportViewerMessages3 Members
 
        // English value: Loading...
        public string CalendarLoading
        {
            get { return "Verwerken..."; }
        }
 
        // English value: Cancel
        public string CancelLinkText
        {
            get { return "Annuleer"; }
        }
 
        // English value: pageCount if PageCountMode.Actual, else pageCount suffixed with a ?
        public string TotalPages(int pageCount, PageCountMode pageCountMode)
        {
            return string.Format(CultureInfo.CurrentCulture, "{0}{1}", pageCount, pageCountMode == PageCountMode.Estimate ? "~" : String.Empty);
        }
 
        #endregion
    }
}
```

Naturally, it would be irresponsible of me to paste code without some matching unit tests:

```c#
using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using InfoSupport.SomeApplication;
 
namespace InfoSupport.SomeApplication.Tests
{
    [TestClass]
    public class DutchReportViewerMessagesTests
    {
        [TestMethod]
        public void TranslatedStringsTests()
        {
            var m = new DutchReportViewerMessages();
            Assert.IsTrue(!String.IsNullOrEmpty(m.BackButtonToolTip));
            Assert.IsTrue(!String.IsNullOrEmpty(m.CalendarLoading));
            Assert.IsTrue(!String.IsNullOrEmpty(m.CancelLinkText));
            Assert.IsTrue(!String.IsNullOrEmpty(m.ChangeCredentialsText));
            Assert.IsTrue(!String.IsNullOrEmpty(m.ChangeCredentialsToolTip));
            Assert.IsTrue(!String.IsNullOrEmpty(m.ClientNoScript));
            Assert.IsTrue(!String.IsNullOrEmpty(m.ClientPrintControlLoadFailed));
            Assert.IsTrue(!String.IsNullOrEmpty(m.CredentialMissingUserNameError(null)));
            Assert.IsTrue(!String.IsNullOrEmpty(m.CurrentPageTextBoxToolTip));
            Assert.IsTrue(!String.IsNullOrEmpty(m.DocumentMap));
            Assert.IsTrue(!String.IsNullOrEmpty(m.DocumentMapButtonToolTip));
            Assert.IsTrue(!String.IsNullOrEmpty(m.ExportButtonText));
            Assert.IsTrue(!String.IsNullOrEmpty(m.ExportButtonToolTip));
            Assert.IsTrue(!String.IsNullOrEmpty(m.ExportFormatsToolTip));
            Assert.IsTrue(!String.IsNullOrEmpty(m.FalseValueText));
            Assert.IsTrue(!String.IsNullOrEmpty(m.FindButtonText));
            Assert.IsTrue(!String.IsNullOrEmpty(m.FindButtonToolTip));
            Assert.IsTrue(!String.IsNullOrEmpty(m.FindNextButtonText));
            Assert.IsTrue(!String.IsNullOrEmpty(m.FindNextButtonToolTip));
            Assert.IsTrue(!String.IsNullOrEmpty(m.FirstPageButtonToolTip));
            Assert.IsTrue(!String.IsNullOrEmpty(m.InvalidPageNumber));
            Assert.IsTrue(!String.IsNullOrEmpty(m.LastPageButtonToolTip));
            Assert.IsTrue(!String.IsNullOrEmpty(m.NextPageButtonToolTip));
            Assert.IsTrue(!String.IsNullOrEmpty(m.NoMoreMatches));
            Assert.IsTrue(!String.IsNullOrEmpty(m.NullCheckBoxText));
            Assert.IsTrue(!String.IsNullOrEmpty(m.NullValueText));
            Assert.IsTrue(!String.IsNullOrEmpty(m.PageOf));
            Assert.IsTrue(!String.IsNullOrEmpty(m.ParameterAreaButtonToolTip));
            Assert.IsTrue(!String.IsNullOrEmpty(m.ParameterDropDownToolTip));
            Assert.IsTrue(!String.IsNullOrEmpty(m.ParameterMissingSelectionError(String.Empty)));
            Assert.IsTrue(!String.IsNullOrEmpty(m.ParameterMissingValueError(String.Empty)));
            Assert.IsTrue(!String.IsNullOrEmpty(m.PasswordPrompt));
            Assert.IsTrue(!String.IsNullOrEmpty(m.PreviousPageButtonToolTip));
            Assert.IsTrue(!String.IsNullOrEmpty(m.PrintButtonToolTip));
            Assert.IsTrue(!String.IsNullOrEmpty(m.ProgressText));
            Assert.IsTrue(!String.IsNullOrEmpty(m.RefreshButtonToolTip));
            Assert.IsTrue(!String.IsNullOrEmpty(m.SearchTextBoxToolTip));
            Assert.IsTrue(!String.IsNullOrEmpty(m.SelectAll));
            Assert.IsTrue(!String.IsNullOrEmpty(m.SelectAValue));
            Assert.IsTrue(!String.IsNullOrEmpty(m.SelectFormat));
            Assert.IsTrue(!String.IsNullOrEmpty(m.TextNotFound));
            Assert.IsTrue(!String.IsNullOrEmpty(m.TodayIs));
            Assert.IsTrue(!String.IsNullOrEmpty(m.TrueValueText));
            Assert.IsTrue(!String.IsNullOrEmpty(m.UserNamePrompt));
            Assert.IsTrue(!String.IsNullOrEmpty(m.ViewReportButtonText));
            Assert.IsTrue(!String.IsNullOrEmpty(m.ZoomControlToolTip));
            Assert.IsTrue(!String.IsNullOrEmpty(m.ZoomToPageWidth));
            Assert.IsTrue(!String.IsNullOrEmpty(m.ZoomToWholePage));
        }
 
        [TestMethod]
        public void FormattableStringsTest()
        {
            var m = new DutchReportViewerMessages();
            var parameter = "abc123";
            Assert.IsTrue(m.ParameterMissingSelectionError(parameter).Contains(parameter));
            Assert.IsTrue(m.ParameterMissingValueError(parameter).Contains(parameter));
            Assert.IsTrue(String.Format(m.TodayIs, parameter).Contains(parameter));
        }
 
        [TestMethod]
        public void GetLocalizedNameForRenderingExtensionTest()
        {
            var m = new DutchReportViewerMessages();
            string[] knownExtensions = { "XML", "CSV", "PDF", "MHTML", "EXCEL", "IMAGE", "WORD"};
            foreach (var ext in knownExtensions)
                Assert.IsTrue(!String.IsNullOrEmpty(m.GetLocalizedNameForRenderingExtension(ext)));
        }
 
        [TestMethod]
        public void GetLocalizedNameForRenderingExtensionTest_UnknownExtensionReturnsNull()
        {
            var m = new DutchReportViewerMessages();
            string[] unknownExtensions = { "DOCX", "PNG", "JPG", "JPEG" };
            foreach (var ext in unknownExtensions)
                Assert.IsNull(m.GetLocalizedNameForRenderingExtension(ext));
        }
 
        [TestMethod]
        public void TotalPagesTest()
        {
            var m = new DutchReportViewerMessages();
            Assert.AreEqual("10",  m.TotalPages(10, Microsoft.Reporting.WebForms.PageCountMode.Actual));
            Assert.AreEqual("10~", m.TotalPages(10, Microsoft.Reporting.WebForms.PageCountMode.Estimate));
        }
    }
}
```

Additionally, below is a table of all properties with their respective English and Dutch translation. Note that this table does not include the methods that are part of the interfaces.

### IREPORTVIEWERMESSAGES

| PROPERTY NAME              | ORIGINAL ENGLISH VALUE               | DUTCH TRANSLATION                   |
|----------------------------|--------------------------------------|-------------------------------------|
| BackButtonToolTip          | Back to Parent Report                | Terug naar het vorige rapport       |
| ChangeCredentialsText      | Change Credentials                   | Wijzig Rechten                      |
| ChangeCredentialsToolTip   | Change Credentials                   | Wijzig Rechten                      |
| CurrentPageTextBoxToolTip  | Current Page                         | Huidige Pagina                      |
| DocumentMap                | Document Map                         | Document Map                        |
| DocumentMapButtonToolTip   | Show / Hide Document Map             | Toon / Verberg Document Map         |
| ExportButtonText           | Export                               | Exporteer                           |
| ExportButtonToolTip        | Export                               | Exporteer                           |
| ExportFormatsToolTip       | Export Formats                       | Exporteer Formaten                  |
| FalseValueText             | False                                | Onwaar                              |
| FindButtonText             | Find                                 | Zoek                                |
| FindButtonToolTip          | Find                                 | Zoek                                |
| FindNextButtonText         | Next                                 | Volgende                            |
| FindNextButtonToolTip      | Find Next                            | Volgend Resultaat                   |
| FirstPageButtonToolTip     | First Page                           | Eerste Pagina                       |
| InvalidPageNumber          | Enter a valid page number            | Voer een geldig paginanummer in     |
| LastPageButtonToolTip      | Last Page                            | Laatste Pagina                      |
| NextPageButtonToolTip      | Next Page                            | Volgende Pagina                     |
| NoMoreMatches              | The entire report has been searched. | Het volledige rapport is doorzocht. |
| NullCheckBoxText           | NULL                                 | Geen waarde                         |
| NullValueText              | Null                                 | Geen waarde                         |
| PageOf                     | of                                   | van                                 |
| ParameterAreaButtonToolTip | Show / Hide Parameters               | Toon / Verberg Parameters           |
| PasswordPrompt             | Password:                            | Wachtwoord:                         |
| PreviousPageButtonToolTip  | Previous Page                        | Vorige Pagina                       |
| PrintButtonToolTip         | Print                                | Afdrukken                           |
| ProgressText               | Loading...                           | Verwerken...                        |
| RefreshButtonToolTip       | Refresh                              | Vernieuwen                          |
| SearchTextBoxToolTip       | Find Text in Report                  | Zoek naar tekst binnen het rapport  |
| SelectAValue               | &lt;Select a Value&gt;               | &lt;Selecteer een waarde&gt;        |
| SelectAll                  | (Select All)                         | (Selecteer alles)                   |
| SelectFormat               | Select a format                      | Selecteer een formaat               |
| TextNotFound               | The search text was not found.       | De zoektekst is niet gevonden.      |
| TodayIs                    | Today is {0}                         | Vandaag is {0}                      |
| TrueValueText              | True                                 | Waar                                |
| UserNamePrompt             | Log In Name:                         | Gebruikersnaam:                     |
| View Report                | ViewReportButtonText                 | Toon Rapport                        |
| ZoomControlToolTip         | Zoom                                 | Zoom                                |
| ZoomToPageWidth            | Page Width                           | Paginabreedte                       |
| ZoomToWholePage            | Whole Page                           | Volledige pagina                    |

### IREPORTVIEWERMESSAGES2

| PROPERTY NAME                | ORIGINAL ENGLISH VALUE                                                             | DUTCH TRANSLATION                                                              |
|------------------------------|------------------------------------------------------------------------------------|--------------------------------------------------------------------------------|
| ClientNoScript               | Your browser does not support scripts or has been configured not to allow scripts. | Uw browser ondersteunt geen JavaScript of deze ondersteuning is uitgeschakeld. |
| ClientPrintControlLoadFailed | Unable to load client print control.                                               | Het laden van het client print control is niet gelukt.                         |
| ParameterDropDownToolTip     | Select a value                                                                     | Selecteer een waarde                                                           |

### IREPORTVIEWERMESSAGES3

| PROPERTY NAME   | ORIGINAL ENGLISH VALUE | DUTCH TRANSLATION |
|-----------------|------------------------|-------------------|
| CalendarLoading | Loading...             | Verwerken...      |
| CancelLinkText  | Cancel                 | Annuleer          |

## Additional notes

* Returning null will make ReportViewer default back to the original value. Use this for string properties or methods you do not wish to translate.
* Getting ReportViewer to pick up your custom implementation requires a change in your application’s web.config or app.config. Add `<add key="ReportViewerMessages" value="MyClass, MyAssembly" />` to your appSettings and substitute MyClass and MyAssembly with the name of your implementing class and the assembly it resides in.


## Summary

Microsoft ReportViewer Control can be localized by implementing the three IReportViewerMessages interfaces. However, the documentation of these interfaces lack the original string values, which in turn makes it difficult to provide a proper translation. In this blog, a complete listing of these values and a Dutch implementation of IReportViewerMessages are presented.