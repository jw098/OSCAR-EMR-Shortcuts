// ==UserScript==
// @name           Inbox_KeyboardShortcuts
// @namespace      oscar
// @include        */lab/CA/ALL/labDisplay*
// @include        */dms/showDocument*
// @include        */dms/MultiPageDocDisplay.jsp*
// @description		Within Inbox: Alt+1 to open first item. Within the Lab result: Alt+1 to Acknowledge. Alt+Q to open E-chart. Alt+W to open Tickler. 
// @grant	   none
// ==/UserScript==


///////////////////////////////////////////////////////////////////////////////////////////
// Check Enabled
///////////////////////////////////////////////////////////////////////////////////////////
checkEnabled_InboxResult();
async function checkEnabled_InboxResult(){
	const isEnabled = await browser.storage.sync.get('enabled');
	console.log("Global enabled? " + isEnabled.enabled);
	if(!isEnabled.enabled){
		return;
	}
	else {
		// Label Labs
		labelAllLabs();
		labelLabsKeydownListener();


		// Keyboard shortcuts
		keydownEventListener_InboxResult();
	}
}