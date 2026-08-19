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
checkEnabled_Consultations_EchartPage();
async function checkEnabled_Consultations_EchartPage(){
	const isEnabled = await browser.storage.local.get('enabled');
	console.log("Global enabled? " + isEnabled.enabled);
	if(!isEnabled.enabled){
		return;
	}
	else {
		const consultationsObj = await browser.storage.local.get('consultations');
		const consultations = consultationsObj.consultations;
		const consultations_keyboardShortcuts = consultations.consultations_keyboardShortcuts;

		if (consultations.postAllHistory){
			CPPMutationObserver();
		}
	}
}


/////////////////////////////////////////////////////////////////
// Past Medical History, Social History, Family History
/////////////////////////////////////////////////////////////////

function addConsultsButtonListener(){
	const consults_button = document.evaluate("//div[contains(@id, 'menuTitleconsultation')]/h3/a",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	console.log(consults_button);
	consults_button.addEventListener('click', async function () { 
		// console.log("button clicked");
		getHistoryText("Medical History");
		getHistoryText("Family History");
		getHistoryText("Social History");
		getHistoryText("Other Meds");
  	},true);
}

/*
PURPOSE:
- use mutation observer to wait for the desired elements to load before trying to access them.

NOTE:
- unfortunately, a load event listener doesn't work, since the desired elements seem to load after the page 'loads'.
*/
function CPPMutationObserver(){
	let mutationObserver = new MutationObserver(function(mutations) {

		// mutations.forEach(function(mutation) {
		// 	console.log(mutation);
		// });

		// console.log(mutations);
		let socHxXPath = "//a[text()='Social History']";
		let pMHxXPath = "//a[text()='Medical History']";
		let famHxXPath = "//a[text()='Family History']";
		let otherMedsXPath = "//a[text()='Other Meds']";

		let socHxBlock = document.evaluate(socHxXPath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;		
		let pMHxBlock = document.evaluate(pMHxXPath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;		
		let famHxBlock = document.evaluate(famHxXPath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;		
		let otherMedsBlock = document.evaluate(otherMedsXPath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
		const consults_button = document.evaluate("//div[contains(@id, 'menuTitleconsultation')]/h3/a",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
		if (!!socHxBlock && !!pMHxBlock && !!famHxBlock && !!otherMedsBlock && !!consults_button){ // confirm all these blocks exist
			mutationObserver.disconnect();
			getHistoryText("Medical History");
			getHistoryText("Family History");
			getHistoryText("Social History");
			getHistoryText("Other Meds");

			addConsultsButtonListener();
		}
	});

	mutationObserver.observe(document.documentElement, {
	  attributes: true,
	  subtree: true,

	  // characterData: true,
	  // childList: true,
	  // attributeOldValue: true,
	  // characterDataOldValue: true
	});
}


/*
NOTE:
- the location of Social History, Medical History, etc. aren't necessarily always in the same quadrant. So, need to find its div block first.
- the text in each history block is extracted and saved to GreaseMonkey with GM.setValue. This allows the value to be accessed across tabs.
  - GM.setValue and GM.getValue are asynchronous. @grant also needs to be set appropriately.
*/
function getHistoryText(history){
	let historyXPath = "//a[text()='" + history+ "']";
	let historyDivBlock = document.evaluate(historyXPath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;		
	let historyDivBlockID = historyDivBlock.parentNode.parentNode.parentNode.id;

	let historyNodeList = document.querySelectorAll('#'+historyDivBlockID+'> div:nth-child(3) > ul > li > span > a');
	// console.log(historyNodeList);

	let historyTextList = "";
	historyNodeList.forEach(function(e){		
		// console.log(e.innerText);
		historyTextList += e.innerText + '\n';
	});

	(async () => {	
		switch (history){
			case "Social History":
				// console.log("Social History:\n" + historyTextList);
				await browser.storage.local.set({
					social_history: historyTextList
				});

				const social_history_obj = await browser.storage.local.get('social_history');
				console.log("stored ->\n" + social_history_obj.social_history);
				break;
			case "Medical History":
				// console.log("Medical History:\n" + historyTextList);
				await browser.storage.local.set({
					medical_history: historyTextList
				});				
				const medical_history_obj = await browser.storage.local.get('medical_history');
				console.log("stored ->\n" + medical_history_obj.medical_history);
				break;
			case "Family History":
				// console.log("Family History:\n" + historyTextList);
				await browser.storage.local.set({
					family_history: historyTextList
				});				
				const family_history_obj = await browser.storage.local.get('family_history');
				console.log("stored ->\n" + family_history_obj.family_history);	
				break;
			case "Other Meds":
				// console.log("Other Meds:\n" + historyTextList);
				await browser.storage.local.set({
					other_meds: historyTextList
				});				
				const other_meds_obj = await browser.storage.local.get('other_meds');
				console.log("stored ->\n" + other_meds_obj.other_meds);	
				break;

		}
	})();
	
}

/*
PURPOSE:
- get the values stored in GreaseMonkey from the previous tab (E-chart) and paste it in the clinical information text area.
NOTES:
- GM.getValue runs asynchronously, and seems to run after the window is loaded.
*/
(async () => {	
	if(consultationPage.test(currentURL)) {
		// console.log(await GM.getValue("socHx", "test"));
		// console.log(await GM.getValue("pMHx", "test"));
		// console.log(await GM.getValue("famHx", "test"));

		let	pMHx = await GM.getValue("pMHx", "test");
		let	socHx = await GM.getValue("socHx", "test");
		let	famHx = await GM.getValue("famHx", "test");

		pMHx = checkEmptyHistoryText(pMHx);
		socHx = checkEmptyHistoryText(socHx);
		famHx = checkEmptyHistoryText(famHx);

		let allHistoryText = "Past Medical History:\n" + pMHx + 
			"\nSocial History:\n" + socHx + "\nFamily History:\n" + famHx;

		console.log(allHistoryText);
		let clinInfoTextBox = document.getElementById('clinicalInformation');
		clinInfoTextBox.value = allHistoryText;
	}

})();

/*
PURPOSE
- if history text is empty string, return "<no data>"
*/
function checkEmptyHistoryText(historyText){
	if (historyText == ""){
		return "<no data>\n"
	}
	else {
		return historyText;
	}
}


/////////////////////////////////////////////////////////////////
// Old stuff: Past Medical History, Social History, Family History
/////////////////////////////////////////////////////////////////

async function getAllHistory() {

	get_history_top_right();


	// const [medHistory, socHistory, famHistory, otherMeds] = await Promise.all([getHistory(urlMedHistory()), getHistory(urlSocHistory()), getHistory(urlFamHistory()), getHistory(urlOtherMeds())]);

	// const allHistory = "Past Medical History:\n" + medHistory + "\nSocial History:\n" + socHistory + "\nFamily History:\n"  + famHistory;
	// // console.log(allHistory);
	
	// const clinInfoTextBox = document.getElementById('clinicalInformation');
	// clinInfoTextBox.value = allHistory;

	// const currentMedsBox = document.getElementById('currentMedications');
	// currentMedsBox.value += "\n\nOther Meds:\n"  + otherMeds;
}



async function getHistory(URL) {
	const otherPageXMLText = await getXMLHTTP(URL);
	const otherPageHTML = new DOMParser().parseFromString(otherPageXMLText, "text/html");
  const historyDivList = otherPageHTML.querySelectorAll("body > div"); 

  if (historyDivList.length == 0){
  	return "<no data>\n"
  }
  else {
		const historyText = getHistoryAsText(historyDivList);
		console.log(historyText);

		return historyText;
  }

}



function getHistoryAsText(historyDivList){
	let historyTextAllLines = "";
	for (i = 0; i < historyDivList.length; i++){
		const historyDiv = historyDivList[i];
		const isArchived = historyDiv.children[1].innerText.includes("ARCHIVED");
		if(isArchived){
			// don't add text that is ARCHIVED.
			continue;
		}
		const historyTextOneLine = historyDiv.children[0].innerText;
		historyTextAllLines += historyTextOneLine + "\n";
	}
	return historyTextAllLines;
}

/////////////////////////////////////////////////////
// get URL, URL elements
/////////////////////////////////////////////////////


function urlSocHistory(){
	var newURL = getURLOrigin() + "CaseManagementEntry.do?method=issuehistory&demographicNo="+ getDemographicNum() + "&issueIds=65";

	return newURL;
}

function urlMedHistory(){
	var newURL = getURLOrigin() + "CaseManagementEntry.do?method=issuehistory&demographicNo="+ getDemographicNum() + "&issueIds=66";

	return newURL;
}

function urlFamHistory(){
	var newURL = getURLOrigin() + "CaseManagementEntry.do?method=issuehistory&demographicNo="+ getDemographicNum() + "&issueIds=69";

	return newURL;
}


function urlEChart(){
	var newURL = getURLOrigin() + "casemgmt/forward.jsp?action=view&demographicNo="+ getDemographicNum();

	return newURL;
}


function urlOtherMeds(){
	var newURL = getURLOrigin() + "CaseManagementEntry.do?method=issuehistory&demographicNo="+ getDemographicNum() + "&issueIds=64";

	return newURL;
}



function getDemographicNum(){
	var params = {}; //Get Params
	if (location.search) {
	    var parts = location.search.substring(1).split('&');
	    for (var i = 0; i < parts.length; i++) {
	        var nv = parts[i].split('=');
	        if (!nv[0]) continue;``
	        params[nv[0]] = nv[1] || true;
	    }
	}

	return params.de;

}
