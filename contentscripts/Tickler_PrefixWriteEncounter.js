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
		if(tickler.tickler_prefixWriteEncounter){
			prefixWriteToEncounter();
		}

	}
}


/* 
PURPOSE:
- do the action corresponding with the current page.
*/

function prefixWriteToEncounter(){
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

/* 
PURPOSE:
- when clicking button 'Submit & Write to Encounter', save to local storage the tickler message text and the person the task was assigned to.
- also, set writeEncounter to true.
 */
 function prefixWriteToEncounter_Tickler(){
	const  submitWriteEncounterButton = 
		document.evaluate("//input[@value='Submit & Write to Encounter']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	const  submitExitButton = 
		document.evaluate("//input[@value='Submit and EXIT']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;

	submitExitButton.addEventListener("click",  async function(){
		saveMessageToStorage("submitExit");
	});

	submitWriteEncounterButton.addEventListener("click", async function(){
		saveMessageToStorage("submitWriteEncounter");
	});
	
}
/* 
NOTE:
- writeEncounterType is either 0,1,2. 0 means no writeEncounter. 1 means Submit and EXIT. 2 means SUbmit and write to encounter.
 */
async function saveMessageToStorage(writeEncounterType){
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



	await browser.storage.local.set({
		ticklerMessage,
		writeEncounter: writeEncounterType
	});
}

/* 
PURPOSE:
- prefix the tickler message with `Tickler message to ${taskAssignedTo}: `
NOTES:
- get writeEncounter from local storage to ensure that a tickler with write to encounter was just made. If not, stop this function
- set writeEncounter to false to avoid posting tickler message text when not intended.
*/
function prefixWriteToEncounter_EChart(){
	prefixWriteToEncounter_EChart_submitWriteEncounter();
	prefixWriteToEncounter_EChart_submitExit();
}

async function prefixWriteToEncounter_EChart_submitExit(){
	window.addEventListener("focus", async function(event) { 
		// const targetTextArea2 = document.querySelector("textarea[id^='caseNote']");
		// const originalContent2 = targetTextArea2.value;
		// console.log(originalContent2);

		const writeEncounterObj = await browser.storage.local.get('writeEncounter');
		const writeEncounter = writeEncounterObj.writeEncounter;
		console.log(writeEncounter);

		if(writeEncounter != "submitExit"){
			return;
		}
		
		browser.storage.local.set({ writeEncounter: "none" });

		const ticklerMessageObj = await browser.storage.local.get('ticklerMessage');
		const ticklerMessage = ticklerMessageObj.ticklerMessage;
		console.log(ticklerMessage);
		
		const targetTextArea = document.querySelector("textarea[id^='caseNote']");
		console.log(targetTextArea);
		const originalContent = targetTextArea.value;
		const messageText = ticklerMessage.messageText;
		const taskAssignedTo = ticklerMessage.taskAssignedTo;

		console.log(originalContent);
		const newContent = 
			originalContent + `\n\n[Tickler message to ${taskAssignedTo}]\n ` + messageText + "\n-------------------------------------------\n";
		console.log(newContent);

		targetTextArea.value = newContent;
	});
}

async function prefixWriteToEncounter_EChart_submitWriteEncounter(){
	// const targetTextArea2 = document.querySelector("textarea[id^='caseNote']");
	// const originalContent2 = targetTextArea2.value;
	// console.log(originalContent2);

	const writeEncounterObj = await browser.storage.local.get('writeEncounter');
	const writeEncounter = writeEncounterObj.writeEncounter;
	console.log(writeEncounter);

	if(writeEncounter != "submitWriteEncounter"){
		return;
	}
	
	browser.storage.local.set({ writeEncounter: "none" });

	const ticklerMessageObj = await browser.storage.local.get('ticklerMessage');
	const ticklerMessage = ticklerMessageObj.ticklerMessage;

	console.log(ticklerMessage);
	
	const targetTextArea =  await getTargetTextArea2();

	console.log(targetTextArea);
	const originalContent = targetTextArea.value;
	const messageText = ticklerMessage.messageText;
	const taskAssignedTo = ticklerMessage.taskAssignedTo;
	const originalContentWithoutMessage = 
		getOriginalContentWithoutMessage(originalContent, messageText);
	console.log(originalContent);
	console.log(originalContentWithoutMessage);
	const newContent = 
		originalContentWithoutMessage + `\n[Tickler message to ${taskAssignedTo}]\n ` + messageText + "\n-------------------------------------------\n";
	console.log(newContent);

	targetTextArea.value = newContent;
	
}

function getOriginalContentWithoutMessage(originalContent, messageText){
	const lastIndexOfText = originalContent.lastIndexOf(messageText);
	if (lastIndexOfText < 0) {
		return originalContent;
	}
	else {
		return originalContent.substring(0, lastIndexOfText);
	}

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

function getTargetTextArea2(){
	return new Promise(function(resolve, reject){

		document.addEventListener("focusin", setTargetFocus);
	
		function setTargetFocus(event){
			document.removeEventListener('focusin',setTargetFocus);
			resolve(document.querySelector("textarea[id^='caseNote']"));
		}
	});
}
