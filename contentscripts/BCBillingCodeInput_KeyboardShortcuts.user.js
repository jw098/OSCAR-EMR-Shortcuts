// ==UserScript==
// @name           BCBilling_CodeInput_KeyboardShortcuts
// @namespace      oscar
// @include        	*billing.do?bill*
// @include        	*oscar/CaseManagementEntry*
// @include        	*billing/CA/BC/billingBC.jsp*
// @include			*SaveBilling.do*
// @include        	*billing/CA/BC/CreateBilling*
// @description		In the BC Billing page: Alt+1 to Continue, Alt+Q to input in person visit billing code, Alt+W to input telehealth visit billing code, Alt+A to set focus to Dx code. The above keyboard shortcuts will also scroll to the bottom of the page. In Diagnostic Code search: Alt+1 to Confirm, Escape to Cancel. In Billing confirmation page: Alt+1 to Save Bill. Alt+A to scroll to bottom of page.
// @grant	   none
// ==/UserScript==

// ///////////////////////////////////////////////////////////////////////////////////////////
// // Check Enabled
// ///////////////////////////////////////////////////////////////////////////////////////////
// checkEnabled_BCBilling_CodeInput();
// async function checkEnabled_BCBilling_CodeInput(){
// 	const isEnabled = await browser.storage.sync.get('enabled');
// 	console.log("Global enabled? " + isEnabled.enabled);
// 	if(!isEnabled.enabled){
// 		return;
// 	}
// 	else {
// 		scrollToPageEnd();
// 		billingCodeInputPage_KeydownListeners();
// 	}
// }

///////////////////////////////////////////////////////////////////////////////////////////
// Event listeners
///////////////////////////////////////////////////////////////////////////////////////////

function billingCodeInputPage_KeydownListeners(){
	window.addEventListener('keydown', function(theEvent) {
		var theKey = theEvent.key;
		var theAltKey = theEvent.altKey;
		var theCtrlKey = theEvent.ctrlKey;
		var theShiftKey= theEvent.shiftKey;
		let theTarget;
		switch(true){
			case  (theAltKey && theKey == 1):		// Alt+1 to Continue.
				theTarget = document.evaluate("id('buttonRow')/td/input[@value='Continue']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
				theTarget.click();
				break;
			case  (theAltKey && theKey == 'q'):		// Alt+Q to input Office visit code.
				inPersonVisit();
				scrollToPageEnd_BCBillingConfirm();
				break;
			case  (theAltKey && theKey == 'w'):		// Alt+W to input Telehealth visit code.
				virtualVisit();
				scrollToPageEnd_BCBillingConfirm();
				break;
			case  (theAltKey && theKey == 'a'):		// Alt+A to set focus to Diagnostic code (row 1).
				$("input[name=billing_1_fee_dx1]").focus();
				scrollToPageEnd_BCBillingConfirm();
				break;
		}
	}, true);
}


function scrollToPageEnd_BCBillingConfirm(){
	window.scrollTo(0, document.body.scrollHeight);
}

