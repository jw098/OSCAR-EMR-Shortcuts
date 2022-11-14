// ==UserScript==
// @name           Allergy_QuickAdd
// @namespace      oscar
// @include        */oscarRx/choosePatient.do*
// @include        */oscarRx/SearchDrug3.jsp*
// @include        */oscarRx/ShowAllergies2.jsp*
// @include        */oscarRx/showAllergy.do*
// @include        */oscarRx/deleteAllergy.do*
// @include        */oscarRx/addReaction2.do*
// @description		Buttons to quickly add allergies. On Medications: Alt+Z to quickly add NKDA.
// ==/UserScript==


///////////////////////////////////////////////////////////////////////////////////////////
// Check Enabled
///////////////////////////////////////////////////////////////////////////////////////////
checkEnabled_Allergy();
async function checkEnabled_Allergy(){
	const isEnabled = await browser.storage.sync.get('enabled');
	console.log("Allergy_QuickAdd enabled? " + isEnabled.enabled);
	if(!isEnabled.enabled){
		return;
	}
	else {
		doPageAction();
	}
}

///////////////////////////////////////////////////////////////////////////////////////////
// Do page action
///////////////////////////////////////////////////////////////////////////////////////////




// /*
// - alert user if allergies haven't yet been set.
// */
// if(medicationPage1.test(currentURL) || medicationPage2.test(currentURL)){
// 	console.log('hi');
// 	window.addEventListener('load', function(){
	
// 		let allergyEntry = document.evaluate("/html/body/table/tbody/tr[2]/td[1]/div/p[3]/a",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
// 		let addAllergy = document.evaluate("/html/body/table/tbody/tr[2]/td[1]/div/p[1]/a",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
		
// 		// check if any allergy entries exist.
// 		if (allergyEntry == null){
// 			if (confirm("Allergies haven't been set yet.\nPress Ok to Add Allergy. Cancel to continue.")){
// 				addAllergy.click();
// 			}

// 			// alert("WARNING: Allergies haven't been set yet.")
// 		}
// 	}, true);
// }


// chain of events: Med -> Add Allergy -> Add Reaction -> Add Allergy -> Med. 0 -> 1 -> 2 -> 3 -> 4

/* 
PURPOSE:
- do the action corresponding with the current page.
*/

function doPageAction(){
	let addReactionPage = /oscarRx\/addReaction2\.do/;

	let addAllergyPage1 = /oscarRx\/ShowAllergies2\.jsp/;
	let addAllergyPage2 = /oscarRx\/deleteAllergy\.do/;
	let addAllergyPage3 = /oscarRx\/showAllergy\.do/;

	let medicationPage1 = /oscarRx\/choosePatient\.do/;
	let medicationPage2 = /oscarRx\/SearchDrug3\.jsp/;
	
	let currentURL = window.location.href;

	switch(true){
		// Medications page
		case medicationPage1.test(currentURL) || medicationPage2.test(currentURL):  
			return medPage_AddAllergyButtons();
	
		// Add Allergy page
		case addAllergyPage1.test(currentURL) || addAllergyPage2.test(currentURL) || addAllergyPage3.test(currentURL):  
			return addAllergyPage_Actions();
	
		// Add Reaction page
		case addReactionPage.test(currentURL):  
			return addReactionPage_Actions();
	}
}



async function addReactionPage_Actions(){
	const nextPageObj = await browser.storage.local.get('nextPageValue');
	const nextPage = nextPageObj.nextPageValue;
	switch (nextPage){
		case 'toAddAllergyThenMedsThenStop':
			fromAddReactiontoAddAllergy();
			await browser.storage.local.set({ nextPageValue:"toMedsThenStop"})
			break;
		default:
			addButtonAddAllergyThenToMeds_FromAddReaction();
	}
}

async function addAllergyPage_Actions(){
	const nextPageObj = await browser.storage.local.get('nextPageValue');
	const nextPage = nextPageObj.nextPageValue;
	// console.log('nextPage: ' + nextPage);
	switch (nextPage){
		case 'toAddNKDAThenAddReactionThenAddAllergyThenMedsThenStop':  // from Med. going to Add Reaction
			NKDAFromAddAllergyToAddReaction();  // clicks the default NKDA button, which adds NKDA and goes to Add Reaction.
			await browser.storage.local.set({ nextPageValue:"toAddAllergyThenMedsThenStop"})
			break;
		case 'toMedsThenStop': // from Add Reaction. going to Med.
			fromAddAllergyToMedications();
			await browser.storage.local.set({ nextPageValue:"stop"})
			break;
		case 'PENtoAddReaction': 
			penFromAddAllergyToAddReaction();
			await browser.storage.local.set({ nextPageValue:"stop"})
			break;					
		case 'SULFAtoAddReaction': 
			sulfaFromAddAllergyToAddReaction();
			await browser.storage.local.set({ nextPageValue:"stop"})
			break;
		case 'toRemoveNKDAThenMedsThenStop':
			removeNKDA();
			await browser.storage.local.set({ nextPageValue:"toMedsThenStop"})
			break;
		default:
			if(areAllergiesNotSet()){
				addButtonNKDA_FromAddAllergy();	
			}
			addPenicillinButton_FromAddAllergy();
			addSulfaButton_FromAddAllergy();
			medPageKeydownListener();	
	}
}

/* 
- assumes we are on Add Allergy page
- inactivates the NKDA allergy entry.
 */
function removeNKDA(){
	const allergyEntryList = document.querySelectorAll(".allergy_table > tbody:nth-child(1) > tr");
	for (let i = 1; i < allergyEntryList.length; i++){
		const allergyEntry = allergyEntryList[i];
		const allergyEntryValues = allergyEntry.children;
		const allergyDescription = allergyEntryValues[2].innerText;
		// console.log(allergyDescription);
		if (allergyDescription == "NKDA"){
			const inactivate = allergyEntryValues[11].children[1];
			// console.log(inactivate);
			inactivate.click();
		}
	}
}

function sendEnter(){
	const ke = new KeyboardEvent('keydown', {
		bubbles: true, cancelable: true, keyCode: 13
	});
	document.body.dispatchEvent(ke);
}

/* 
PURPOSE
- on the Medication page, add the allergy buttons if the Allergies not yet set.
 */
async function medPage_AddAllergyButtons(){
	if(areAllergiesNotSet()){
		addButtonNKDA_FromMedPage();
		addPenicillinButton_FromMedPage();
		addSulfaButton_FromMedPage();
	}
	else if (isNKDA()){
		addButtonRemoveNKDA_FromMedPage();
	}
	medPageKeydownListener();
	await browser.storage.local.set({ nextPageValue: 'stop'});
}
/* 
- returns true if NKDA has been set as one of the allergies
 */
function isNKDA(){
	let allergyEntry = document.evaluate("/html/body/table/tbody/tr[2]/td[1]/div/p[3]/a",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;

	const allergyEntryList = document.querySelectorAll("p.PropSheetMenuItemLevel1 > a:nth-child(1):not([href])");
	console.log(allergyEntryList);
	for (let i = 0; i < allergyEntryList.length; i++){
		const allergyEntry = allergyEntryList[i];
		const allergyEntryText = allergyEntry.innerText;
		if(allergyEntryText.includes("NKDA")){
			return true;
		}
	}
	return false;
}

/*
- returns true if allergies have not been set.
*/
function areAllergiesNotSet(){
	let allergyEntry = document.evaluate("/html/body/table/tbody/tr[2]/td[1]/div/p[3]/a",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	return allergyEntry == null;
}


/////////////////////////////////////////////
// Changes the page from one to another
/////////////////////////////////////////////

/*
NOTE:
- assumes the current page is the Add Allergy Page.
*/
function  NKDAFromAddAllergyToAddReaction(){
	let defaultNKDAButton = document.evaluate("//form[@name='RxSearchAllergyForm']/table[1]/tbody/tr[3]/td/input[4]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	defaultNKDAButton.click();
}

function penFromAddAllergyToAddReaction(){
	let defaultPenicillinButton = document.evaluate("//form[@name='RxSearchAllergyForm']/table[1]/tbody/tr[3]/td/input[5]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	defaultPenicillinButton.click();
}

function sulfaFromAddAllergyToAddReaction(){
	let defaultSulfaButton = document.evaluate("//form[@name='RxSearchAllergyForm']/table[1]/tbody/tr[3]/td/input[6]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	defaultSulfaButton.click();	
}

/*
NOTE:
- assumes the current page is the Add Allergy Page.
*/
function  fromAddAllergyToMedications(){
	let backToMedications = document.evaluate("//input[@value='Back to Search Drug']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	backToMedications.click();
	
}


/*
NOTE:
- assumes the current page is the Add Reaction Page.
*/
function fromAddReactiontoAddAllergy(){
	let addReactionButton = document.evaluate("//input[@value='Add Allergy/Adverse Reaction']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	addReactionButton.click();
	
}

/*
note:
- assumes current page is Medications
*/
function fromMedsToAddAllergy(){
	let addAllergyButton = document.evaluate("//div[@class='PropSheetMenu']/p[1]/a",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	addAllergyButton.click();
}


/////////////////////////////////////////////
// Keydown listener
/////////////////////////////////////////////

/*
- keyboard shortcuts on the Medications page.
*/
function medPageKeydownListener(){
	window.addEventListener('keydown', function (theEvent){
		const theKey = theEvent.key;
		const theAltKey = theEvent.altKey;
		switch(true){
			case theAltKey && theKey == 'z':
				document.getElementById('autoNKDAButton').click();
				break;
		}
	}, true);
}



/////////////////////////////////////////////
// Add button on Medication Page
/////////////////////////////////////////////


function addButtonRemoveNKDA_FromMedPage(){
	removeAlreadyExistingElementAndBrTag(document.getElementById("removeNKDAButton"));
	let activeAllergies = document.evaluate("//div[@class='PropSheetMenu']/p[1]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	let targetDiv = activeAllergies;

	targetDiv.insertAdjacentHTML('beforebegin',	'<input id="removeNKDAButton" type="button" value="Remove NKDA" title = "Automatically clicks through the pages and removes NKDA from the allergy list. User must confirm to inactivate the allergy." style="font-size:14px"><br/>');

	addButtonRemoveNKDAListener_FromMedPage();	
}

function addButtonRemoveNKDAListener_FromMedPage(){
	var theButton = document.getElementById('removeNKDAButton');
	theButton.addEventListener('click', async function () { 
  		fromMedsToAddAllergy();
		await browser.storage.local.set({ nextPageValue:"toRemoveNKDAThenMedsThenStop"})
  	},true);
}

/* 
- add a NKDA button that automatically clicks through and ends up back in Meds.
*/ 
function addButtonNKDA_FromMedPage(){
	removeAlreadyExistingElementAndBrTag(document.getElementById("autoNKDAButton"));
	let activeAllergies = document.evaluate("//div[@class='PropSheetMenu']/p[1]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	let targetDiv = activeAllergies;

	targetDiv.insertAdjacentHTML('beforebegin',	'<input id="autoNKDAButton" type="button" value="Set NKDA" title = "Automatically clicks through the pages and adds NKDA to the allergy list" style="background-color: red; font-size:14px"><br/>');

	// var inputButton = document.createElement('input');
	// inputButton.id = 'autoNKDAButton';
	// inputButton.type = 'button';
	// inputButton.value = 'Auto NKDA';
	// inputButton.style.backgroundColor = 'red';
	// targetDiv.before(inputButton);	
	addButtonNKDAListener_FromMedPage();
}

function addButtonNKDAListener_FromMedPage(){
	var theButton = document.getElementById('autoNKDAButton');
	theButton.addEventListener('click', async function () { 
  		fromMedsToAddAllergy();
		await browser.storage.local.set({ nextPageValue:"toAddNKDAThenAddReactionThenAddAllergyThenMedsThenStop"})
  	},true);
}

function addPenicillinButton_FromMedPage(){
	removeAlreadyExistingElementAndBrTag(document.getElementById("addPenicillinButton"));
	let activeAllergies = document.evaluate("//div[@class='PropSheetMenu']/p[1]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	let targetDiv = activeAllergies;

	targetDiv.insertAdjacentHTML('beforebegin',	'<input id="addPenicillinButton" type="button" value="Add Penicillin Allergy" style="background-color: red; font-size:14px"><br/>');
	addPenicillinButtonListener_FromMedPage();
}

function addPenicillinButtonListener_FromMedPage(){
	var theButton = document.getElementById('addPenicillinButton');
	theButton.addEventListener('click', async function () { 
  		fromMedsToAddAllergy();
		await browser.storage.local.set({ nextPageValue:"PENtoAddReaction"})
  	},true);
}

function addSulfaButton_FromMedPage(){
	removeAlreadyExistingElementAndBrTag(document.getElementById("addSulfaButton"));
	let activeAllergies = document.evaluate("//div[@class='PropSheetMenu']/p[1]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	let targetDiv = activeAllergies;

	targetDiv.insertAdjacentHTML('beforebegin',	'<input id="addSulfaButton" type="button" value="Add Sulfa Allergy" style="background-color: red; font-size:14px"><br/>');
	addSulfaButtonListener_FromMedPage();
}

function addSulfaButtonListener_FromMedPage(){
	var theButton = document.getElementById('addSulfaButton');
	theButton.addEventListener('click', async function () { 
  		fromMedsToAddAllergy();
		await browser.storage.local.set({ nextPageValue:"SULFAtoAddReaction"})
  	},true);
}

/* 
PURPOSE
- if the given element already exists in the document, remove it and the br after it.
 */
function removeAlreadyExistingElementAndBrTag(element){
	if(!!element){
		const brTag = element.nextElementSibling;
		// console.log(brTag.tagName);
		if (brTag.tagName=="BR"){
			brTag.remove();
		}
		element.remove();
	}
}

/////////////////////////////////////////////
// Add button on Add Allergy page Page
/////////////////////////////////////////////


/* 
- add a NKDA button that automatically
*/ 
function addButtonNKDA_FromAddAllergy(){
	removeAlreadyExistingElementAndBrTag(document.getElementById("autoNKDAButton"));
	let activeAllergies = document.evaluate("//div[@class='PropSheetMenu']/p[1]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	
	// console.log(activeAllergies);
	let targetDiv = activeAllergies;

	targetDiv.insertAdjacentHTML('beforebegin',	'<input id="autoNKDAButton" type="button" value="Set NKDA" title = "Automatically clicks through the pages and adds NKDA to the allergy list" style="background-color: red; font-size:14px"><br/>');

	// var inputButton = document.createElement('input');
	// inputButton.id = 'autoNKDAButton';
	// inputButton.type = 'button';
	// inputButton.value = 'Auto NKDA';
	// inputButton.style.backgroundColor = 'red';
	// targetDiv.before(inputButton);	
	addButtonNKDAListener_FromAddAllergy();
}

 
function addButtonNKDAListener_FromAddAllergy(){
	var theButton = document.getElementById('autoNKDAButton');
	theButton.addEventListener('click', async function () { 
		NKDAFromAddAllergyToAddReaction();
		await browser.storage.local.set({ nextPageValue:"toAddAllergyThenMedsThenStop"})
  	},true);
}

function addPenicillinButton_FromAddAllergy(){
	removeAlreadyExistingElementAndBrTag(document.getElementById("addPenicillinButton"));
	let activeAllergies = document.evaluate("//div[@class='PropSheetMenu']/p[1]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	let targetDiv = activeAllergies;

	targetDiv.insertAdjacentHTML('beforebegin',	'<input id="addPenicillinButton" type="button" value="Add Penicillin Allergy" style="background-color: red; font-size:14px"><br/>');
	addPenicillinButtonListener_FromAddAllergy();
}

function addPenicillinButtonListener_FromAddAllergy(){
	var theButton = document.getElementById('addPenicillinButton');
	theButton.addEventListener('click', function () { 
		penFromAddAllergyToAddReaction();
  	},true);
}

function addSulfaButton_FromAddAllergy(){
	removeAlreadyExistingElementAndBrTag(document.getElementById("addSulfaButton"));
	let activeAllergies = document.evaluate("//div[@class='PropSheetMenu']/p[1]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	let targetDiv = activeAllergies;

	targetDiv.insertAdjacentHTML('beforebegin',	'<input id="addSulfaButton" type="button" value="Add Sulfa Allergy" style="background-color: red; font-size:14px"><br/>');
	addSulfaButtonListener_FromAddAllergy();
}

function addSulfaButtonListener_FromAddAllergy(){
	var theButton = document.getElementById('addSulfaButton');
	theButton.addEventListener('click', function () { 
  		sulfaFromAddAllergyToAddReaction();
  	},true);
}




/////////////////////////////////////////////
// Add button on Add Reaction page Page
/////////////////////////////////////////////


/*
- assumes current page is AddReaction.
*/
function addButtonAddAllergyThenToMeds_FromAddReaction(){
	removeAlreadyExistingElementAndBrTag(document.getElementById("addAllergyThenToMeds"));
	let targetDiv = document.evaluate("//form[@name='RxAddAllergyForm']/table[1]/tbody/tr[9]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	targetDiv.insertAdjacentHTML('beforeend',	'<input id="addAllergyThenToMeds" type="button" value="Add Allergy Then To Medications" style="background-color: red; font-size:14px">');
	buttonListenerAddAllergyThenToMeds_FromAddReaction();

}

function buttonListenerAddAllergyThenToMeds_FromAddReaction(){
	var theButton = document.getElementById('addAllergyThenToMeds');
	theButton.addEventListener('click', async function () { 
  		fromAddReactiontoAddAllergy();  		
		await browser.storage.local.set({ nextPageValue:"toMedsThenStop"})
  	},true);
}


//////////////////////////////////////////////////////////////////////////////////////
// Jquery UI

// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js


// @require 				http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @require 				http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js

// jQuery.noConflict( true );
// var jQuery_2_1_1 = $.noConflict(true);

// $("head").append (
//     '<link '
//   + 'href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/themes/le-frog/jquery-ui.min.css" '
//   + 'rel="stylesheet" type="text/css">'
// );

// console.log($( "#AutoNumber1" ));

// jQuery_2_1_1( "#appContainer" ).dialog({
//   resizable: false,
//   height: "auto",
//   width: 400,
//   modal: true,
//   buttons: {
//     "Delete all items": function() {
//       $( this ).dialog( "close" );
//     },
//     Cancel: function() {
//       $( this ).dialog( "close" );
//     }
//   }
// });

// $( function() {
// $( "#appContainer" ).dialog({
//   resizable: false,
//   height: "auto",
//   width: 400,
//   modal: true,
//   buttons: {
//     "Delete all items": function() {
//       $( this ).dialog( "close" );
//     },
//     Cancel: function() {
//       $( this ).dialog( "close" );
//     }
//   }
// });
// } );

// $( "#AutoNumber1" ).dialog({
//   resizable: false,
//   height: "auto",
//   width: 400,
//   modal: true,
//   buttons: {
//     "Delete all items": function() {
//       $( this ).dialog( "close" );
//     },
//     Cancel: function() {
//       $( this ).dialog( "close" );
//     }
//   }
// });

// jQuery_2_1_1( "#AutoNumber1" ).dialog({
//   resizable: false,
//   height: "auto",
//   width: 400,
//   modal: true,
//   buttons: {
//     "Delete all items": function() {
//       jQuery_2_1_1( this ).dialog( "close" );
//     },
//     Cancel: function() {
//       jQuery_2_1_1( this ).dialog( "close" );
//     }
//   }
// });


// jQuery_2_1_1( function() {
// jQuery_2_1_1( "#AutoNumber1" ).dialog({
//   resizable: false,
//   height: "auto",
//   width: 400,
//   modal: true,
//   buttons: {
//     "Delete all items": function() {
//       jQuery_2_1_1( this ).dialog( "close" );
//     },
//     Cancel: function() {
//       jQuery_2_1_1( this ).dialog( "close" );
//     }
//   }
// });
// } );