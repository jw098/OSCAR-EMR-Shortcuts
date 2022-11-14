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
	if(!isEnabled.enabled){
		return;
	}
	else {
		scrollToPageEnd();
		addAllBillingButtons();
		billingCodeInputPage_KeydownListeners();
	}
}


//////////////////////////////////////////////////////////////////
// Add Buttons
//////////////////////////////////////////////////////////////////
function addAllBillingButtons(){
	/*
	tr = $('.serviceCodesTable').children();
	tr.prepend("<tr><td colspan=3 id='extravvrow'></td></tr>");
	*/

	/* 3rd row */
	tr = $('input[name=billing_1_fee]').parent().parent().parent().parent().parent().parent();
	tr.prepend("<tr><td colspan=3 id='extravvrow3'></td></tr>");

	/* 2nd row */
	tr = $('input[name=billing_1_fee]').parent().parent().parent().parent().parent().parent();
	tr.prepend("<tr><td colspan=3 id='extravvrow2'></td></tr>");

	/* 1st row */
	tr = $('input[name=billing_1_fee]').parent().parent().parent().parent().parent().parent();
	tr.prepend("<tr><td colspan=3 id='extravvrow1'></td></tr>");

	// Row 1 buttons
	addBillingButton('Office', inPersonVisit, "", "9999FF", 1);
	addBillingButton('TH Visit', virtualVisit, "", "9999FF", 1);
	addBillingButton('TH Counsel', virtualVisitCounselling, "", "9999FF", 1);
	addBillingButton('AlliedPhone', AlliedPhone, "", "9999FF", 1);
	addBillingButton('AlliedConf', AlliedConf, "", "9999FF", 1);

	// Row 2 buttons
	addBillingButton('INR', INR, "INR", "8FF", 2);
	addBillingButton('IM inj', Injection, "B12, etc; not allergy shot", "8FF", 2);
	addBillingButton('Allergy', Allergy, "Allergy shot", "8FF", 2);
	addBillingButton('Pap', Pap, "Pap", "8FF", 2);
	addBillingButton('UA', Urinalysis, "Labs - UA, UDS, etc", "8FF", 2);
	addBillingButton('Preg dip', UrinePreg, "Urine Pregnancy test ", "8FF", 2);
	addBillingButton('Cryo', Cryo, "Cryo", "8FF", 2);

	// Row 3 buttons
	addBillingButton('Flu Vax Only', fluVaxAlone, "Flu Vax Only", "8FF", 3);
	addBillingButton('Adult Flu Vax With Visit', adultFluVaxWithVisit, "Adult Flu Vax With Visit", "8FF", 3);
	addBillingButton('NH visit', LTCI_visit, "Nursing Home visit", "8FF", 3);
	addBillingButton('NH bonus', LTCI_visit1, "Nursing Home first visit bonus", "8FF", 3);
	addBillingButton('PneumoniaVax', pneumoniaAlone, "PPV or Prevnar adult vaccine only", "8FF", 3);
	addBillingButton('CV19', CV19_visit, "COVID 19 counselling", "8FF", 3);

	$("#extravvrow1").append(document.createElement('br'));
}

function addBillingButton(theValue, clickAction, theTitle, fontColor, rowNum){
	removeAlreadyExistingElement(document.getElementById(theValue));

	var input = document.createElement('input');
	input.type = 'button';
	input.value = theValue;
	input.id = theValue;
	input.onclick = clickAction;
	input.setAttribute('style', `font-size:12px; font-weight: bold; background: #${fontColor};`);
	input.setAttribute('title', theTitle);
	
	$(`#extravvrow${rowNum}`).append(input);
}

/* 
PURPOSE
- if the given element already exists in the document, remove it.
 */
function removeAlreadyExistingElement(element){
	if(!!element){
		element.remove();
	}
}


//////////////////////////////////////////////////////////////////
// Onclick Functions
//////////////////////////////////////////////////////////////////

//alert($('.serviceCodesTable').children().html());

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

function virtualVisitCounselling(){
  age = $("#patientIdRow").children().children().next().next().next().html();
  if(age < 2)
    code="13238";
  else if(age >= 2 && age < 50)
    code="13438";
  else if(age >= 50 && age < 60)
    code="13538";
  else if(age >= 60 && age < 70)
    code="13638";
  else if(age >= 70 && age < 80)
    code="13738";
  else 
    code="13838";
  // $("input[name=billing_1_fee]").val(code);
  addServiceCodeRigid(code, "", "", "", "", "");
  $("input[name=billing_1_fee_dx1]").focus();
}

function AlliedPhone() {
	// code="13005";
	// $("input[name=billing_1_fee]").val(code);
	// $("input[name=billing_1_fee_dx1]").val("");
	addServiceCodeRigid("13005", "", "", "", "", "");
	$("input[name=billing_1_fee_dx1]").focus();
}

function fluVaxAlone(){
	age = $("#patientIdRow").children().children().next().next().next().html();
	let code;
	if(age < 19){
		code="10015";
		// $("input[name=billing_1_fee]").val(code);
	}
	else{
		code="10041";
		// $("input[name=billing_1_fee]").val(code);
	}
	addServiceCodeRigid(code, "v048", "", "", "", "");
}

function adultFluVaxWithVisit(){
	code="10040";
	// $("input[name=billing_1_fee]").val(code);
	// $("input[name=billing_1_fee_dx1]").val("v048");
	addServiceCodeRigid(code, "v048", "", "", "", "");
}

function INR() {
	// code="00043";
	// $("input[name=billing_1_fee]").val(code);
	// $("input[name=billing_1_fee_dx1]").val("286");
	addServiceCodeRigid("00043", "286", "", "", "", "");
	$("input[name=billing_1_fee_dx1]").focus();
}

function Injection() {
	// code="00010";
	// $("input[name=billing_1_fee]").val(code);
	// $("input[name=billing_1_fee_dx1]").val("");
	addServiceCodeRigid("00010", "", "", "", "", "");
	$("input[name=billing_1_fee_dx1]").focus();
}

function Allergy() {
	// code="00034";
	// $("input[name=billing_1_fee]").val(code);
	// $("input[name=billing_1_fee_dx1]").val("32A");
	addServiceCodeRigid("00034", "32A", "", "", "", "");
}

function Pap() {
	addServiceCodeRigid("14560", "V723", "00044", "", "", "");
	// $("input[name=billing_1_fee]").val("14560");
	// $("input[name=billing_1_fee_dx1]").val("V723");
	// $("input[name=billing_2_fee]").val("00044");
	// $("input[name=billing_3_fee]").val("");
}

function Urinalysis() {
	svcCode="15130";
	// $("input[name=billing_1_fee]").val(code);
	// $("input[name=billing_1_fee_dx1]").val("");
	addServiceCode(svcCode,"")
	$("input[name=billing_1_fee_dx1]").focus();
}

function UrinePreg() {
	svcCode="15120";
	// $("input[name=billing_1_fee]").val(code);
	// $("input[name=billing_1_fee_dx1]").val("V22");
	addServiceCode(svcCode,"")
	$("input[name=billing_1_fee_dx1]").focus();
}

function Cryo() {
	addServiceCodeRigid("00190", "", "00044", "", "", "");
	// code="00190";
	// $("input[name=billing_1_fee]").val(code);
	// $("input[name=billing_1_fee_dx1]").val("");
	// $("input[name=billing_2_fee]").val("00044");
	// $("input[name=billing_3_fee]").val("");
	$("input[name=billing_1_fee_dx1]").focus();
}

function LTCI_visit(){
	// code="00114";
	// $("input[name=billing_1_fee]").val(code);
	addServiceCodeRigid("00114", "", "", "", "", "");
}

function LTCI_visit1(){
	// code="13334";
	// $("input[name=billing_2_fee]").val(code);
	addServiceCodeRigid("13334", "", "", "", "", "");
}

function pneumoniaAlone(){
	// code="10041";
	// $("input[name=billing_1_fee]").val(code);
	// $("input[name=billing_1_fee_dx1]").val("v038");
	addServiceCodeRigid("10041", "v038", "", "", "", "");
}

function CV19_visit(){
	// code="10045";
	// $("input[name=billing_1_fee]").val(code);
	// $("input[name=billing_1_fee_dx1]").val("C19");
	addServiceCodeRigid("10045", "C19", "", "", "", "");
}

function AlliedConf(){
	// code="14077";
	// $("input[name=billing_1_fee]").val(code);
	// $("input[name=billing_1_fee_dx1]").val("");
	addServiceCodeRigid("14077", "", "", "", "", "");
}


function addServiceCode(svcCode, dxCode) {
	var billingRowCount = 3;
	for (var i = 1; i <= billingRowCount; i++) {
		inputtedBillingCode = jQuery("#billing_" + i + "_fee").val();
		if (inputtedBillingCode === "") {
		  jQuery("#billing_" + i + "_fee").val(svcCode);
		  jQuery("#billing_" + i + "_fee_dx1").val(dxCode);
		  // var trayCode =  getAssocCode(svcCode,trayAssocCodes);
		  // if(trayCode!=''){
			// addSvcCode(field, trayCode, true);
		  // }
		  
		  break;
		}
		else if (inputtedBillingCode == svcCode){ // if same service code already entered, clear current field.
			jQuery("#billing_" + i + "_fee").val("");
			break;  
		}
	}
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

  