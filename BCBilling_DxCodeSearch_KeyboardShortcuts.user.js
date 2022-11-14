// ==UserScript==
// @name           KeyboardShortcuts_BCBilling
// @namespace      oscar
// @include        	*billing/CA/BC/billingDigNewSearch.jsp?*
// @description		In the BC Billing page: Alt+1 to Continue, Alt+Q to input in person visit billing code, Alt+W to input telehealth visit billing code, Alt+A to set focus to Dx code. The above keyboard shortcuts will also scroll to the bottom of the page. In Diagnostic Code search: Alt+1 to Confirm, Escape to Cancel. In Billing confirmation page: Alt+1 to Save Bill. Alt+A to scroll to bottom of page.
// @grant	   none
// ==/UserScript==

///////////////////////////////////////////////////////////////////////////////////////////
// Check Enabled
///////////////////////////////////////////////////////////////////////////////////////////
checkEnabled_BCBilling_DxCodeSearch();
async function checkEnabled_BCBilling_DxCodeSearch(){
	const isEnabled = await browser.storage.sync.get('enabled');
	console.log("Global enabled? " + isEnabled.enabled);
	if(!isEnabled.enabled){
		return;
	}
	else {
		dxCodeSearchPage_KeydownListeners();
	}
}


///////////////////////////////////////////////////////////////////////////////////////////
// Event listeners
///////////////////////////////////////////////////////////////////////////////////////////


function dxCodeSearchPage_KeydownListeners(){
	window.addEventListener('keydown', function(theEvent) {
		var theKey = theEvent.key;
		var theAltKey = theEvent.altKey;
		var theCtrlKey = theEvent.ctrlKey;
		var theShiftKey= theEvent.shiftKey;
		let theTarget;		
		switch(true){				
			case (theAltKey && theKey ==  1):				// Alt+1 to Confirm.
				theTarget = document.evaluate("id('servicecode')/input[@value='Confirm']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
				theTarget.click();
				break;	
			case (theKey == "Escape"):						// Escape to Cancel. 
				// alert("dxCodeSearch");
				theTarget = document.evaluate("id('servicecode')/input[@value='Cancel']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
				theTarget.click();
				break;	
		}
	}, true);
}
