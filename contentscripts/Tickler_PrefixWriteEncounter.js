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
		// Medications page
		case ticklerPage1.test(currentURL) || ticklerPage2.test(currentURL):  
			return prefixWriteToEncounter_submitWrite_Tickler();
	
		// Add Allergy page
		case eChartPage.test(currentURL):  
			return prefixWriteToEncounter_EChart_writeFromStorageOnLoad("submitWriteEncounter");
	}
}



/* 
PURPOSE:
- when clicking button 'Submit & Write to Encounter', save to local storage the tickler message text and the person the task was assigned to.
- also, set writeEncounter to submitWriteEncounter.
 */
 function prefixWriteToEncounter_submitWrite_Tickler(){
	const  submitWriteEncounterButton = 
		document.evaluate("//input[@value='Submit & Write to Encounter']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;


	submitWriteEncounterButton.addEventListener("click", async function(){
		saveMessageToStorageAndBroadcast("submitWriteEncounter");
	});
	
}



/* 
NOTE:
- writeEncounterType is either 'none', 'submitExit', 'submitWrite'. 
  - 'none' means no writeEncounter. 
  - 'submitExit' means Submit and EXIT. 
  - 'submitWrite' means Submit and write to encounter.
*/
async function saveMessageToStorageAndBroadcast(writeEncounterType){
	const taskAssignedToDropdown = document.querySelector("select[name='task_assigned_to']");
	const taskAssignedTo = taskAssignedToDropdown.options[taskAssignedToDropdown.selectedIndex].text;

	const messageTextArea = 
		document.evaluate("//textarea",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	const messageText = messageTextArea.value;

	// console.log(taskAssignedTo);
	// console.log(messageText)

	const patientName = document.querySelector("input[name='keyword']").value.replace(/[\s]/g, "");

	const ticklerMessage = {
		messageText: messageText,
		taskAssignedTo: taskAssignedTo,
		messagePatientName: patientName
	};

	await browser.storage.local.set({
		ticklerMessage,
		writeEncounter: writeEncounterType
	});

	if(writeEncounterType == "submitExit"){
		const encounterChannel = new BroadcastChannel("encounterChannel");
		encounterChannel.postMessage({
			ticklerMessage
		});
	}
}



/* 
PURPOSE:
- prefix the tickler message with `Tickler message to ${taskAssignedTo}: `
NOTES:
- get writeEncounter from local storage. proceed only if storedWriteEncounter matches given writeEncounterType. writeEncounterType tells us whether the 'Submit and Exit' or 'Submit and Write to Encounter' buttons were just pressed.
- set writeEncounter to 'none' to avoid posting tickler message text when not intended.
*/
async function prefixWriteToEncounter_EChart_writeFromStorageOnLoad(writeEncounterType){


	/* 
	- proceed only if storedWriteEncounter matches given writeEncounterType
	- then set writeEncounter to none, so that the message isn't posted again.
	*/
	const storedWriteEncounterObj = await browser.storage.local.get('writeEncounter');
	const storedWriteEncounter = storedWriteEncounterObj.writeEncounter;
	console.log(storedWriteEncounter);
	if(storedWriteEncounter != writeEncounterType){
		return;
	}
	browser.storage.local.set({ writeEncounter: "none" });

	/* 
	get the ticklerMessage 
	*/
	const ticklerMessageObj = await browser.storage.local.get('ticklerMessage');
	const ticklerMessage = ticklerMessageObj.ticklerMessage;
	console.log(ticklerMessage);

	/* 
	- ensure it is the correct patient before proceeding.
	 */
	if(!patientNameMatchesMessage(ticklerMessage)){
		// console.error("this shouldn't happen.")
		return;
	}
	
	/* 
	get the target text area 
	*/
	const targetTextArea =  await getTargetTextArea();
	// console.log(targetTextArea);

	/* 
	post tickler message to target text area, after the original content. 
	*/
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

/* 
NOTE:
- Tickler Write to Encounter will automatically post the message to the Encounter. This function removes that text so we only get the original content, without the message.
- sometimes, the tickler message isn't automatically posted though.
 */
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
NOTE
- can't just use queryselector("textarea[id^='caseNote']") because it doesn't load right away. id="notCPP" loads right away, but the case notes do not.
- so, we wait for the page to fully load, and set focus to the case note, by which time it has loaded.
*/
function getTargetTextArea(){
	return new Promise(function(resolve, reject){
		
		document.addEventListener("focusin", setTargetFocus);
	
		function setTargetFocus(event){
			document.removeEventListener('focusin',setTargetFocus);
			resolve(document.querySelector("textarea[id^='caseNote']"));
		}
	});
}

/////////////////////////////////////////////////////////
// Submit Exit
/////////////////////////////////////////////////////////



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
		// Medications page
		case ticklerPage1.test(currentURL) || ticklerPage2.test(currentURL):  
			return prefixWriteToEncounter_submitExit_Tickler();
	
		// Add Allergy page
		case eChartPage.test(currentURL):  
			return prefixWriteToEncounter_submitExit_EChart();
	}
}

/* 
PURPOSE:
- when clicking button 'Submit and Exit', save to local storage the tickler message text and the person the task was assigned to.
- also, set writeEncounter to submitExit.
- also, send the message via BroadcastChannel
 */
function prefixWriteToEncounter_submitExit_Tickler(){
	const  submitExitButton = 
		document.evaluate("//input[@value='Submit and EXIT']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;

	submitExitButton.addEventListener("click",  async function(){
		saveMessageToStorageAndBroadcast("submitExit");
	});

}

/* 
NOTE:
- writeTicklerWhenMessageEvent: writes the tickler message if the eChart is already open when the Tickler is made.
- writeFromStorageOnLoad: writes the tickler message if the eChart was closed at the time of Tickler creation. This writes the tickler message when the eChart opens, as long as the patient name matches.
 */
function prefixWriteToEncounter_submitExit_EChart(){
	prefixWriteToEncounter_submitExit_writeTicklerWhenMessageEvent();
	prefixWriteToEncounter_EChart_writeFromStorageOnLoad("submitExit");
}
/* 
PURPOSE
- Adds event listener for the message event.
- when message received, posts the tickler message, if the patient name matches the message.
NOTE:
- this only works if the E-chart is already open when the Tickler was sent. Otherwise, the message won't be received.
- for the tickler message to be posted on eChart loading, see writeFromStorageOnLoad.
*/
function prefixWriteToEncounter_submitExit_writeTicklerWhenMessageEvent(){
	const encounterChannel = new BroadcastChannel("encounterChannel");
	encounterChannel.addEventListener("message", function(event){
		const ticklerMessage = event.data.ticklerMessage;
		console.log(ticklerMessage);
		if(patientNameMatchesMessage(ticklerMessage)){
			browser.storage.local.set({ writeEncounter: "none" });
			postTicklerMessage(ticklerMessage);
		}
	});

}

function patientNameMatchesMessage(ticklerMessage){
	const currentPatientName = document.querySelectorAll(".Header > a:nth-child(1)")[0].innerText.replace(/[\s]/g, "");
	const messagePatientName = ticklerMessage.messagePatientName;
	console.log(currentPatientName);
	console.log(messagePatientName);

	return currentPatientName == messagePatientName;

}

function postTicklerMessage(ticklerMessage){
	const targetTextArea = document.querySelector("textarea[id^='caseNote']");
	// console.log(targetTextArea);
	const originalContent = targetTextArea.value;
	const messageText = ticklerMessage.messageText;
	const taskAssignedTo = ticklerMessage.taskAssignedTo;

	console.log(originalContent);
	const newContent = 
		originalContent + `\n\n[Tickler message to ${taskAssignedTo}]\n ` + messageText + "\n-------------------------------------------\n";
	console.log(newContent);

	targetTextArea.value = newContent;
}
	


