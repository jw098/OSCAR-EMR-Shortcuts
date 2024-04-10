# OSCAR-EMR-ShortCuts

Keyboard shortcuts, buttons, automated actions for OSCAR EMR.

# Features:

- Automated actions

- Buttons for common actions

- Keyboard shortcuts for commonly used actions

# Disclaimer:

This extension has only been tested on the WELL Health implementation of OSCAR EMR, in BC, in Classic view. Feel free to contact me if you notice any bugs.

# Detailed feature list

## Automated actions: 

- Consultations: Automatically pastes Past Medical history, Social history, and Family history to the Clinical information text area. Post patient's age and gender in Reason for Consultation text area.

- EChart: Update the sidebar with newly created eForms, Consults, Ticklers, Medications when posted, without needing to refresh.

- Inbox: Automatically label labs with the actual names of each test (e.g. CBC, A1c, Electrolytes as opposed to cryptic labels like HAEM1, CHEM4, etc.). Also, the label of the previous version of the lab result is shown, as well any new results compared to the previous version.

- Medications: A pop-up confirmation dialog will appear if there are medications pending submission.

## Buttons

- Allergy: Quickly add allergies.

- BC Billing:  Automatically bill age-related codes and other common codes.

- EChart: Search box to search e-forms by title. Various navigation buttons for e-chart screen (e.g. Lab req, Ultrasound req, X-ray req). 

- Inbox: Button that opens all new and old reports (including acknowledged and filed reports). Another button that opens just new reports.

## Keyboard shortcuts:

- BC Billing page: Alt+1 to Continue, Alt+Q to input in person visit billing code, Alt+W to input telehealth visit billing code, Alt+A to set focus to Dx code.

- Consultation: Alt+1 to 'Submit Consultation Request'. Alt+W to close the window. 

- EChart: Alt+1 to Sign/Save/Bill. Alt+2 to Save. Alt+3 to Sign/Save. Alt+4 to Exit. Alt+W, Alt+Q, Alt+A to open Consultation, eForms, Ticklers respectively. 

- eForms: Within e-forms repository, Alt+A to close. Within an individual e-form: Alt+1 to Submit. Alt+2 to Print & Submit.

- Inbox: Within Inbox, Alt+1 to open first item. Within the Lab result: Alt+1 to Acknowledge. Alt+Q to open E-chart. Alt+W to open Tickler.

- Medications: Alt+1 to 'Save And Print', Alt+A to set focus to 'Drug Name' text area (to enter a new medication), Alt+Q to close the window. When the prescription print window pops up, Alt+1 to 'Print & Paste into EMR'. Alt+2 to 'Fax & Paste into EMR'. 

- Schedule: Alt+1 opens the e-chart for the next patient. i.e. the first patient that is not Billed, not Signed, not No show, and not Cancelled.

- Tickler:  Alt+1 to 'Submit and EXIT', Alt+2 to 'Submit & Write to Encounter', Alt+A to set focus to text box. When the Tickler page loads, it also automatically sets focus to the text box. Note: if not already done, you should consider setting a 'Default Tickler Recipient' under OSCAR Preferences.

