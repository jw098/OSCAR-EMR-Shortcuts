// ==UserScript==
// @name           KeyboardShortcuts_BCBilling
// @namespace      oscar
// @include        	*billing.do?bill*
// @include        	*oscar/CaseManagementEntry*
// @include        	*billing/CA/BC/billingBC.jsp*
// @include			*SaveBilling.do*
// @include        	*billing/CA/BC/billingDigNewSearch.jsp?*
// @include        	*billing/CA/BC/CreateBilling*
// @description		In the BC Billing page: Alt+1 to Continue, Alt+Q to input in person visit billing code, Alt+W to input telehealth visit billing code, Alt+A to set focus to Dx code. The above keyboard shortcuts will also scroll to the bottom of the page. In Diagnostic Code search: Alt+1 to Confirm, Escape to Cancel. In Billing confirmation page: Alt+1 to Save Bill. Alt+A to scroll to bottom of page.
// @grant	   none
// ==/UserScript==

///////////////////////////////////////////////////////////////////////////////////////////
// Check Enabled
///////////////////////////////////////////////////////////////////////////////////////////
checkGlobalEnabled();
async function checkGlobalEnabled(){
	const isEnabled = await browser.storage.sync.get('enabled');
	console.log("Allergy_QuickAdd enabled? " + isEnabled.enabled);
	if(!isEnabled.enabled){
		return;
	}
	else {
		doPageAction();
	}
}

///////////////////////////////////////////////////////////////////////////////////////////
// Do page action
///////////////////////////////////////////////////////////////////////////////////////////
let currentURL = window.location.href;
const billingPage = /billing.do\?bill/;
const billingPage2 = /oscar\/CaseManagementEntry/;
const dxCodeSearch = /billing\/CA\/BC\/billingDigNewSearch.jsp/;
const billingConf = /billing\/CA\/BC\/CreateBilling/;

function doPageAction(){
	switch(true){		
		// If in BC Billing Code Input page, whose XML contains id = "billingFormtable"
		case  (!!document.getElementById("billingFormTable")):
			return billingCodeInputPage_Actions();

		// If in Diagnostic Code search, whose XML contains id = "servicecode"
		case (!!document.getElementById("servicecode")):	
			return dxCodeSearchPage_Actions();

		// Check if in in Billing confirmation page. XML contains name = "BillingSaveBillingForm"		
		case (document.getElementsByName("BillingSaveBillingForm").length > 0):	
			return billingConfirmPage_Actions();
	}
}

function billingCodeInputPage_Actions(){
	scrollToPageEnd();
	billingCodeInputPage_KeydownListeners();
}

function dxCodeSearchPage_Actions(){
	dxCodeSearchPage_KeydownListeners();
}

function billingConfirmPage_Actions(){
	scrollToPageEnd();
	billingConfirmPage_KeydownListeners();
}



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
				$("input[name=billing_1_fee_dx1]").focus();
				window.scrollTo(0, document.body.scrollHeight);
				break;
			case  (theAltKey && theKey == 'w'):		// Alt+W to input Telehealth visit code.
				virtualVisit();
				$("input[name=billing_1_fee_dx1]").focus();
				window.scrollTo(0, document.body.scrollHeight);
				break;
			case  (theAltKey && theKey == 'a'):		// Alt+A to set focus to Diagnostic code (row 1).
				$("input[name=billing_1_fee_dx1]").focus();
				window.scrollTo(0, document.body.scrollHeight);
				break;
		}
	}, true);
}

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


function billingConfirmPage_KeydownListeners(){
	window.addEventListener('keydown', function(theEvent) {
		var theKey = theEvent.key;
		var theAltKey = theEvent.altKey;
		var theCtrlKey = theEvent.ctrlKey;
		var theShiftKey= theEvent.shiftKey;
		let theTarget;		
		switch(true){
			case(theAltKey && theKey == 1):		// Alt+1 to Save Bill. 
				theTarget = document.evaluate("//input[@value='Save Bill']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
				theTarget.click();
				break;
			case theAltKey && theKey == 'a':
				window.scrollTo(0, document.body.scrollHeight);
				break;	
		}
	}, true);
}


function scrollToPageEnd(){
	window.scrollTo(0, document.body.scrollHeight);
}


///////////////////////////////////////////////////////////////////////////////////////////
// Input billing codes
///////////////////////////////////////////////////////////////////////////////////////////

function inPersonVisit(){
  age = $("#patientIdRow").children().children().next().next().next().html();
  if(age < 2)
    code="12100";
  else if(age >= 2 && age < 50)
    code="00100";
  else if(age >= 50 && age < 60)
    code="15300";
  else if(age >= 60 && age < 70)
    code="16100";
  else if(age >= 70 && age < 80)
    code="17100";
  else 
    code="18100";
  // $("input[name=billing_1_fee]").val(code);
  addServiceCodeRigid(code);
}

function virtualVisit(){
  age = $("#patientIdRow").children().children().next().next().next().html();
  if(age < 2)
    code="13237";
  else if(age >= 2 && age < 50)
    code="13437";
  else if(age >= 50 && age < 60)
    code="13537";
  else if(age >= 60 && age < 70)
    code="13637";
  else if(age >= 70 && age < 80)
    code="13737";
  else 
    code="13837";
  // $("input[name=billing_1_fee]").val(code);
  addServiceCodeRigid(code);
}

function addServiceCodeRigid(svcCode1) {
	inputtedBillingCode1 = jQuery("#billing_1_fee").val();
	if(inputtedBillingCode1 == svcCode1){			// if same service code already entered, clear all fields.
		$("input[name=billing_1_fee]").val("");
		$("input[name=billing_1_fee_dx1]").val("");
		$("input[name=billing_2_fee]").val("");
		$("input[name=billing_2_fee_dx1]").val("");
		$("input[name=billing_3_fee]").val("");
		$("input[name=billing_3_fee_dx1]").val("");
	}
	else{
		$("input[name=billing_1_fee]").val(svcCode1);
	}
}