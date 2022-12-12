// ==UserScript==
// @name           eForms_KeyboardShortcuts
// @namespace      oscar
// @include        */eform/efmformslistadd.jsp*
// @include        */eform/efmformadd_data.jsp*
// @include        */eform/efmshowform_data.jsp*
// @description		Within e-forms repository, Alt+A to close. Within an individual e-form: Alt+1 to Submit. Alt+2 to Print & Submit.
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @grant	   none
// ==/UserScript==


///////////////////////////////////////////////////////////////////////////////////////////
// Check Enabled
///////////////////////////////////////////////////////////////////////////////////////////
checkEnabled_eFormIndividual();
async function checkEnabled_eFormIndividual(){
	const isEnabled = await browser.storage.sync.get('enabled');
	console.log("eForm enabled? " + isEnabled.enabled);
	if(!isEnabled.enabled){
		return;
	}
	else {

		const eFormObj = await browser.storage.sync.get('eFormIndividual');
		const eFormIndividual = eFormObj.eFormIndividual;
		const eFormIndividual_keyboardShortcuts = eFormIndividual.eFormIndividual_keyboardShortcuts;
		if (eFormIndividual_keyboardShortcuts.eFormIndividual_shortcuts_enabled){
			keydownEventListener_eFormIndividual(eFormIndividual_keyboardShortcuts);
		}
	}
}

function keydownEventListener_eFormIndividual(eFormIndividual_keyboardShortcuts){
	const submit_enabled = 
		eFormIndividual_keyboardShortcuts.eFormIndividual_shortcut_submit_enabled;
	const submit_keybinding = 
		eFormIndividual_keyboardShortcuts.eFormIndividual_shortcut_submit_keybinding;
	const printSubmit_enabled = 
		eFormIndividual_keyboardShortcuts.eFormIndividual_shortcut_printSubmit_enabled;
	const printSubmit_keybinding = 
		eFormIndividual_keyboardShortcuts.eFormIndividual_shortcut_printSubmit_keybinding;	
	
	window.addEventListener('keydown', function(theEvent) {
		switch(true){
			case submit_enabled && keybindingMatches(submit_keybinding, theEvent):
				$('#SubmitButton').click();
				break;
			case printSubmit_enabled && keybindingMatches(printSubmit_keybinding, theEvent):
				$('#PrintSubmitButton').click();
				break;
		}
	}, true);
	
}


