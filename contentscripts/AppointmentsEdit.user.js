// ==UserScript==
// @name           AppointmentsEdit
// @namespace      oscar
// @include        *appointment/appointmentcontrol.jsp* 
// @description		
// @grant       none
// ==/UserScript==

///////////////////////////////////////////////////////////////////////////////////////////
// Check Enabled
///////////////////////////////////////////////////////////////////////////////////////////

checkEnabled_ApptEdit();
async function checkEnabled_ApptEdit(){
	const isEnabled = await browser.storage.sync.get('enabled');
	console.log(await browser.storage.sync.get(null));
	
	if(!isEnabled.enabled){
		return;
	}
	else {
		const apptEditObj = await browser.storage.sync.get('apptEdit');
		const apptEdit = apptEditObj.apptEdit;
		const apptEdit_keyboardShortcuts = apptEdit.apptEdit_keyboardShortcuts;
		if (apptEdit_keyboardShortcuts.apptEdit_shortcuts_enabled){
			apptEdit_KeyDownListener(apptEdit_keyboardShortcuts);
		}
	}


}
///////////////////////////////////////////////////////////////////////////////////////////
// Event Listeners
///////////////////////////////////////////////////////////////////////////////////////////


function apptEdit_KeyDownListener(apptEdit_keyboardShortcuts){
	const updateAppt_enabled = 
		apptEdit_keyboardShortcuts.apptEdit_shortcut_updateAppt_enabled;
	const updateAppt_keybinding = 
		apptEdit_keyboardShortcuts.apptEdit_shortcut_updateAppt_keybinding;

	window.addEventListener('keydown', function(theEvent) {
		let theTarget;
		switch(true){
			case updateAppt_enabled && keybindingMatches(updateAppt_keybinding, theEvent):

				const xpath = '//*[@id="updateButton"]';
				theTarget = document.evaluate(xpath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE ,null).singleNodeValue;            
				theTarget.click();
				break;
		}
	}, true);
}


