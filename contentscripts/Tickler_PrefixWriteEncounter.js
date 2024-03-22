// ==UserScript==
// @name           Tickler_KeyboardShortcuts
// @namespace      oscar
// @include        */tickler/ticklerAdd.jsp*
// @include        */tickler/ForwardDemographicTickler*
// @description		Within Ticklers, Alt+1 to 'Submit and EXIT', Alt+2 to 'Submit & Write to Encounter', Alt+A to set focus to text box. When the Tickler page loads, it also automatically sets focus to the text box. Note: if not already done, you should consider setting a 'Default Tickler Recipient' under OSCAR Preferences.
// @grant	   none
// ==/UserScript==


// {
// 	"matches": [
// 		"*://*/*/casemgmt/forward.jsp?action=view&demographic*",
// 		"*://*/*/tickler/ticklerAdd.jsp*",
// 		"*://*/*/tickler/ForwardDemographicTickler*"
// 	],
// 	"js": [
// 		"thirdparty/jquery3.1.0.min.js", 
// 		"contentscripts/utils.js",
// 		"contentscripts/Tickler_PrefixWriteEncounter.js"
// 	]
// },



///////////////////////////////////////////////////////////////////////////////////////////
// Check Enabled
///////////////////////////////////////////////////////////////////////////////////////////

checkEnabled_TicklerPrefixWriteEncounter();
async function checkEnabled_TicklerPrefixWriteEncounter(){
	const isEnabled = await browser.storage.local.get('enabled');
	console.log("Tickler_KeyboardShortcuts enabled? " + isEnabled.enabled);
	if(!isEnabled.enabled){
		return;
	}
	else {
		const ticklerObj = await browser.storage.local.get('tickler');
		const tickler = ticklerObj.tickler;
		const prefixSubmitWrite = tickler.tickler_prefixWriteEncounter_submitWrite;
		const prefixSubmitExit = tickler.tickler_prefixWriteEncounter_submitExit;
		if(prefixSubmitWrite){
			prefixWriteToEncounter_submitWrite();
		}

		if(prefixSubmitExit){
			prefixWriteToEncounter_submitExit();
		}

	}
}





/* 
PURPOSE:
- do the action corresponding with the current page.
*/

function prefixWriteToEncounter_submitWrite(){
	const  ticklerPage1 = /tickler\/ticklerAdd\.jsp/;
	const  ticklerPage2 = /tickler\/ForwardDemographicTickler/;

	let eChartPage = /casemgmt\/forward\.jsp\?action\=view\&demographic/;
	
	let currentURL = window.location.href;

	switch(true){
		// Tickler page
		case ticklerPage1.test(currentURL) || ticklerPage2.test(currentURL):  
			return prefixWriteToEncounter_submitWrite_TicklerPage();
	
		// Echart page
		case eChartPage.test(currentURL):  
			return prefixWriteToEncounter_EChartPage_writeFromStorageOnLoad("submitWriteEncounter");
	}
}





/* 
PURPOSE:
- do the action corresponding with the current page.
*/
function prefixWriteToEncounter_submitExit(){
	const  ticklerPage1 = /tickler\/ticklerAdd\.jsp/;
	const  ticklerPage2 = /tickler\/ForwardDemographicTickler/;

	let eChartPage = /casemgmt\/forward\.jsp\?action\=view\&demographic/;
	
	let currentURL = window.location.href;

	switch(true){
		// Tickler page
		case ticklerPage1.test(currentURL) || ticklerPage2.test(currentURL):  
			return prefixWriteToEncounter_submitExit_TicklerPage();
	
		// eChart page
		case eChartPage.test(currentURL):
			return prefixWriteToEncounter_submitExit_EChartPage();
	}
}


