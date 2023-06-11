// ==UserScript==
// @name						Consultations_KeyboardShortcuts
// @namespace				oscar
// @include					*/oscarConsultationRequest/ConsultationFormRequest.jsp*
// @description			Within Consultations: Alt+1 to 'Submit Consultation Request'. Automatically pastes Past Medical history, Social history, and Family history to the Clinical information text area.
// @require 				http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @grant						GM.setValue
// @grant						GM.getValue
// @grant						GM.deleteValue
// ==/UserScript==
//"*://*/*/oscarEncounter/ViewRequest.do*"
 
///////////////////////////////////////////////////////////////////////////////////////////
// Check Enabled
///////////////////////////////////////////////////////////////////////////////////////////
checkEnabled_UpdateConsultations();
async function checkEnabled_UpdateConsultations(){
	const isEnabled = await browser.storage.local.get('enabled');
	console.log("Global enabled? " + isEnabled.enabled);
	if(!isEnabled.enabled){
		return;
	}
	else {
		const consultationsObj = await browser.storage.local.get('consultations');
		const consultations = consultationsObj.consultations;
		const consultations_keyboardShortcuts = consultations.consultations_keyboardShortcuts;
		if (consultations_keyboardShortcuts.consultations_shortcuts_enabled){
			keydownEventListener_UpdateConsultations(consultations_keyboardShortcuts);
		}
	}
}

////////////////////////////////
// Keydown Event Listeners
////////////////////////////////

function keydownEventListener_UpdateConsultations(consultations_keyboardShortcuts){
	const close_enabled = 
	consultations_keyboardShortcuts.consultations_shortcuts_close_enabled;
	const close_keybinding = 
	consultations_keyboardShortcuts.consultations_shortcuts_close_keybinding;
	const submit_enabled = 
	consultations_keyboardShortcuts.consultations_shortcuts_submit_enabled;
	const submit_keybinding = 
	consultations_keyboardShortcuts.consultations_shortcuts_submit_keybinding;


	// let currentURL = window.location.href;
	// const eChartPage = /casemgmt\/forward\.jsp\?action\=view\&/;
	// const consultationPage = /oscarConsultationRequest\/ConsultationFormRequest\.jsp/;
	
	window.addEventListener('keydown', function(theEvent) {
		switch(true){
			case close_enabled && keybindingMatches(close_keybinding, theEvent):	// If on Consultation page, hotkey to close window.
				window.close();
				break;
			case submit_enabled && keybindingMatches(submit_keybinding, theEvent):
				const theTarget2 = document.evaluate("//input[@value='Update Consultation Request']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
				theTarget2.click();
				break;					
		}	
	 
	}, true);
}
