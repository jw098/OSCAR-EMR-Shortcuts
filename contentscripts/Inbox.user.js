// ==UserScript==
// @name           Inbox_Buttons
// @namespace      oscar
// @include        */dms/inboxManage*
// @description		Within Inbox: A button that opens all reports (including acknowledged and filed reports), as well as one that open just new reports.
// @grant	   none
// ==/UserScript==

///////////////////////////////////////////////////////////////////////////////////////////
// Check Enabled
///////////////////////////////////////////////////////////////////////////////////////////
checkEnabled_Inbox();
async function checkEnabled_Inbox(){
	const isEnabled = await browser.storage.sync.get('enabled');
	console.log("Global enabled? " + isEnabled.enabled);
	if(!isEnabled.enabled){
		return;
	}
	else {
		// Buttons
		addButtonLoadNewReports();
		addButtonLoadAllReports();


		// Keyboard shortcuts
		keydownEventListener_Inbox();
	}
}

