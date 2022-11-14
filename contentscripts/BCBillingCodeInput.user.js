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
	const isEnabled = await browser.storage.sync.get('enabled');
	console.log("Global enabled? " + isEnabled.enabled);
	const isBillingCodeInputPage = !!document.getElementById("billingFormTable");
	console.log(isBillingCodeInputPage);
	if(!isEnabled.enabled || !isBillingCodeInputPage){
		return;
	}
	else {
		// Buttons
		addAllBillingButtons();

		// Keyboard shortcuts
		scrollToPageEnd();
		billingCodeInputPage_KeydownListeners();
	}
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
    addServiceCodeRigid(code, "", "", "", "", "");
	$("input[name=billing_1_fee_dx1]").focus();
    
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
    addServiceCodeRigid(code, "", "", "", "", "");
    $("input[name=billing_1_fee_dx1]").focus();
  }

  function addServiceCodeRigid(svcCode1, dxCode1, svcCode2, dxCode2, svcCode3, dxCode3) {
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
      $("input[name=billing_1_fee_dx1]").val(dxCode1);
      $("input[name=billing_2_fee]").val(svcCode2);
      $("input[name=billing_2_fee_dx1]").val(dxCode2);
      $("input[name=billing_3_fee]").val(svcCode3);
      $("input[name=billing_3_fee_dx1]").val(dxCode3);
    }
  
  }

