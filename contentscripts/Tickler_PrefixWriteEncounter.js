// ==UserScript==
// @name           Tickler_KeyboardShortcuts
// @namespace      oscar
// @include        */tickler/ticklerAdd.jsp*
// @include        */tickler/ForwardDemographicTickler*
// @description		Within Ticklers, Alt+1 to 'Submit and EXIT', Alt+2 to 'Submit & Write to Encounter', Alt+A to set focus to text box. When the Tickler page loads, it also automatically sets focus to the text box. Note: if not already done, you should consider setting a 'Default Tickler Recipient' under OSCAR Preferences.
// @grant	   none
// ==/UserScript==


///////////////////////////////////////////////////////////////////////////////////////////
// Check Enabled
///////////////////////////////////////////////////////////////////////////////////////////

checkEnabled_TicklerPrefixWriteEncounter();
async function checkEnabled_TicklerPrefixWriteEncounter(){
	const isEnabled = await browser.storage.sync.get('enabled');
	console.log("Tickler_KeyboardShortcuts enabled? " + isEnabled.enabled);
	if(!isEnabled.enabled){
		return;
	}
	else {
		const ticklerObj = await browser.storage.sync.get('tickler');
		const tickler = ticklerObj.tickler;
		doPageAction();

	}
}


/* 
PURPOSE:
- do the action corresponding with the current page.
*/

function doPageAction(){
	"*://*/*/casemgmt/forward.jsp?action=view&demographic*",
	"*://*/*/tickler/ticklerAdd.jsp*",
	"*://*/*/tickler/ForwardDemographicTickler*"
	const  ticklerPage1 = /tickler\/ticklerAdd\.jsp/;
	const  ticklerPage2 = /tickler\/ForwardDemographicTickler/;

	let eChartPage = /casemgmt\/forward\.jsp\?action\=view\&demographic/;
	
	let currentURL = window.location.href;

	switch(true){
		// Medications page
		case ticklerPage1.test(currentURL) || ticklerPage2.test(currentURL):  
			return prefixWriteToEncounter_Tickler();
	
		// Add Allergy page
		case eChartPage.test(currentURL):  
			return prefixWriteToEncounter_EChart();
	}
}


 function prefixWriteToEncounter_Tickler(){
	const  submitWriteEncounterButton = 
		document.evaluate("//input[@value='Submit & Write to Encounter']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;

	submitWriteEncounterButton.addEventListener("click", async function(){
		const taskAssignedToDropdown = document.querySelector("select[name='task_assigned_to']");
		const taskAssignedTo= taskAssignedToDropdown.options[taskAssignedToDropdown.selectedIndex].text;

		const messageTextArea = 
			document.evaluate("//textarea",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
		const messageText = messageTextArea.value;

		// console.log(taskAssignedTo);
		// console.log(messageText)
		const ticklerMessage = {
			messageText: messageText,
			taskAssignedTo: taskAssignedTo
		};

		// const writeEncounter = {
		// 	writeEncounter: true
		// };

		await browser.storage.local.set({
			ticklerMessage,
			writeEncounter: true
		});
	})
	
}

/* 
PURPOSE:
- prefix the tickler message with `Tickler message to ${taskAssignedTo}: `
NOTES:
- get writeEncounter from local storage to ensure that a tickler with write to encounter was just made. If not, stop this function
*/
async function prefixWriteToEncounter_EChart(){
	const writeEncounterObj = await browser.storage.local.get('writeEncounter');
	const writeEncounter = writeEncounterObj.writeEncounter;
	console.log(writeEncounter);

	if(!writeEncounter){
		return;
	}
	browser.storage.local.set({ writeEncounter: false });

	const ticklerMessageObj = await browser.storage.local.get('ticklerMessage');
	const ticklerMessage = ticklerMessageObj.ticklerMessage;

	console.log(ticklerMessage);
	const targetTextArea = await getTargetTextArea(); 
	const originalContent = targetTextArea.textContent;
	const messageText = ticklerMessage.messageText;
	const taskAssignedTo = ticklerMessage.taskAssignedTo;
	const originalContentSliced = originalContent.split(messageText);
	const newContent = 
		originalContentSliced[0] + `\n[Tickler message to ${taskAssignedTo}]\n ` + messageText + "\n-------------------------------------------" + originalContentSliced[1];
	console.log(newContent);

	targetTextArea.value = newContent;

}

/* 
PURPOSE:
- get the text in the current active text area.
 */
function getTargetTextArea(){
	return new Promise(function(resolve, reject){
		// document.addEventListener("load", function (){
		// 	theTarget = document.activeElement;
		// });
	
		document.addEventListener("focusin", setTargetFocus);
	
		function setTargetFocus(event){
			document.removeEventListener('focusin',setTargetFocus);
			resolve(event.target);
		}
	});
}

