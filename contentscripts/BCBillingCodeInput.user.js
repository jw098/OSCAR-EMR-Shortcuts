// ==UserScript==
// @name Billing Screen Buttons
// @namespace   PMscripts
// @description  On the BC Billing page, buttons to automatically bill age-related codes and other common codes. 
// @include     *billing.do?billRegion=BC&billForm=*
// @include     *billing.do?billRegion=BC&changeBillForm=*
// @include     *billing.do?billRegion=BC&billForm=CFP&hotclick=*
// @include     *billing/CA/BC/CreateBilling*
// @include     *SaveBilling.do*
// @include     *billing/CA/BC/billingBC.jsp*
// @include     *CaseManagementEntry.do
// @exclude    *CaseManagementEntry.do?method=issuehistory&demographicNo*
// @require   https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @grant       none
// @version 2.0 For contract FP - all docs + LTCI line
// ==/UserScript==


///////////////////////////////////////////////////////////////////////////////////////////
// Check Enabled
///////////////////////////////////////////////////////////////////////////////////////////
checkEnabled_BCBillingCodeInput();
async function checkEnabled_BCBillingCodeInput(){
	// const all = await browser.storage.local.get(null);
	// console.log(all);
	const isEnabled = await browser.storage.local.get('enabled');
	console.log("Global enabled? " + isEnabled.enabled);
	const isBillingCodeInputPage = !!document.getElementById("billingFormTable");
	console.log(isBillingCodeInputPage);
	if(!isEnabled.enabled || !isBillingCodeInputPage){
		return;
	}
	else {

		const billingCodeInputObj = await browser.storage.local.get('billingCodeInput');
		const billingCodeInput = billingCodeInputObj.billingCodeInput;



		console.log(billingCodeInputObj.billingCodeInput);
		// Buttons
		if (billingCodeInputObj.billingCodeInput.billingButtons){
			addAllBillingButtons();
		}

		// Button Group 1
		if (billingCodeInput.bcBillingButtonGroup1_enable){
			addBillingButtonRow(billingCodeInput.bcBillingButtonGroup1, 1);
		}

		
		// Keyboard shortcuts
		if (billingCodeInputObj.billingCodeInput.billingCodeInput_PageEnd){
			scrollToPageEnd_BCBillingConfirm();
		}
		const billingCodeInput_keyboardShortcuts = billingCodeInputObj.billingCodeInput.billingCodeInput_keyboardShortcuts;
		if (billingCodeInput_keyboardShortcuts.billingCodeInput_shortcuts_enabled){
			billingCodeInputPage_KeydownListeners(billingCodeInput_keyboardShortcuts);
		}
		
		
	}
}

