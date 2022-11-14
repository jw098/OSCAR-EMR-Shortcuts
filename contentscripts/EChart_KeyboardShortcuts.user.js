// ==UserScript==
// @name           EChart_KeyboardShortcuts
// @namespace      oscar
// @include        */casemgmt/forward.jsp?action=view&*
// @description		Within the E-chart: Alt+1 to Sign/Save/Bill. Alt+2 to Save. Alt+3 to Sign/Save. Alt+4 to Exit. Alt+W, Alt+Q, Alt+A to open Consultation, eForms, Ticklers respectively. When the CPP pop-up windows are open (e.g. for Social History, Medical History, etc.), Alt+1 to Sign & Save, Escape to close the pop-up window.
// @grant	   none
// ==/UserScript==


function keydownEventListener_eChart(){
	window.addEventListener('keydown', function(theEvent) {
		//theEvent.stopPropagation();
		//theEvent.preventDefault();
		// const theKeyCode = theEvent.charCode;// || event.which;
		// const theKey = String.fromCharCode(theKeyCode);
		const theKey = theEvent.key;
		const theAltKey = theEvent.altKey;
		const theCtrlKey = theEvent.ctrlKey;
		const theShiftKey= theEvent.shiftKey;
		
		let currentURL = window.location.href;
		const medPage = /oscarRx\/choosePatient\.do/
		const eChartPage = /casemgmt\/forward\.jsp\?action\=view\&/;
		const eFormsPage = /eform\/efmformslistadd\.jsp/;
		const consultationPage = /oscarConsultationRequest\/ConsultationFormRequest\.jsp/;
		const ticklerPage = /tickler\/ticklerAdd\.jsp/;
		
		// console.log(CPPWindowPresent());
	
		if (CPPWindowPresent()){
			console.log('cpp window present');
			CPPWindowHotkeys(theEvent);
		}
		else {
			eChartPageHotkeys(theEvent);
		}
	
	}, true);
}




function eChartPageHotkeys(theEvent){
	const medicationHotkey = 'q';
	const consultationHotkey = 'w';
	const eFormsHotkey = 'a';
	const ticklerHotkey = 'z';

	const theKey = theEvent.key;
	const theAltKey = theEvent.altKey;
	const theCtrlKey = theEvent.ctrlKey;
	const theShiftKey= theEvent.shiftKey;
	let theTarget = null;
	switch(true){
		case theAltKey && theKey == 1:  // Sign, Save, and Bill
			theTarget = document.evaluate("id('save')/span/input[contains(@src,'dollar-sign-icon.png')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			break;
		case theAltKey && theKey == medicationHotkey:  // Medications
			theTarget = document.evaluate("//div[@id='Rx']/div/div/h3/a",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			break;
		case theAltKey && theKey == eFormsHotkey:  // eForms
			theTarget = document.evaluate("//div[@id='menuTitleeforms ']/h3/a",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			break;
		case theAltKey && theKey == consultationHotkey:  // Consultation			
			theTarget = document.evaluate("//div[@id='menuTitleconsultation ']/h3/a",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			break;  //"id('menuTitleconsultation ')/h3/a"  //"id('consultation')/div/div[2]/h3/a"  /html/body/div/div/div[4]/div[10]/div/div[2]/h3/a
		case theAltKey && theKey == ticklerHotkey:  // Tickler
			theTarget = document.evaluate("//div[@id='menuTitletickler ']/h3/a",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			break;
		case theAltKey && theKey == 2:  // Save
			theTarget = document.evaluate("id('save')/span/input[contains(@src,'media-floppy.png')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			break;
		case theAltKey && theKey == 3:  // Sign and Save
			theTarget = document.evaluate("id('save')/span/input[contains(@src,'note-save.png')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			// document.getElementById("caseNote_note0").blur();
			theTarget.focus();
			setTimeout(function() {theTarget.click();}, 50);
			// theTarget.click()
			break;
		case theAltKey && theKey == 4: // Exit
			theTarget = document.evaluate("id('save')/span/input[contains(@src,'system-log-out.png')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			break;

	}
}

/*
PURPOSE:
- return true if the CPP popup window is present.
*/
function CPPWindowPresent(){
	return document.getElementById('frmIssueNotes').offsetParent != null;
}


function CPPWindowHotkeys(theEvent){
	const theKey = theEvent.key;
	const theAltKey = theEvent.altKey;
	const theCtrlKey = theEvent.ctrlKey;
	const theShiftKey= theEvent.shiftKey;
	
	let theTarget = null;
	switch(true){
		case theAltKey && theKey == 1:  // Sign & Save
			theTarget = document.evaluate("id('frmIssueNotes')/span/input[contains(@src,'note-save.png')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			break;
		case theKey == 'Escape':
			theTarget = document.evaluate("id('frmIssueNotes')/span/input[contains(@src,'system-log-out.png')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			break;
	}
}