// ==UserScript==
// @name           Medications_KeyboardShortcuts
// @namespace      oscar
// @include        */oscarRx/choosePatient.do*
// @include        */oscarRx/SearchDrug3.jsp*
// @description    Within Medications, Alt+1 to 'Save And Print', Alt+A to set focus to 'Drug Name' text area (to enter a new medication), Alt+Q to close the window. When the prescription print window pops up, Alt+1 to 'Print & Paste into EMR'. Alt+2 to 'Fax & Paste into EMR'. When closing the Medications page, a pop-up confirmation dialog will appear if there are medications pending submission.
// @grant          none
// ==/UserScript==

///////////////////////////////////////////////////////////////////////////////////////////
// Check Enabled
///////////////////////////////////////////////////////////////////////////////////////////
checkEnabled_Medications();
async function checkEnabled_Medications(){
	const isEnabled = await browser.storage.sync.get('enabled');
	console.log("Medications enabled? " + isEnabled.enabled);
	if(!isEnabled.enabled){
		return;
	}
	else {
		keydownEventListener_MedsWindow();
		savePrintClickListener();
		confirmCloseMeds();
	}
}

///////////////////////////////////////////////////////////////////////////////////////////
// Window Keydown listener
///////////////////////////////////////////////////////////////////////////////////////////
/*
PURPOSE: keydown event listener. Checks if lightwindow loaded and does the corresponding keydown action.

NOTE: To register all actions when the iFrame is active, need separate listeners on the top-level window as well as the iFrame(s).
*/
function keydownEventListener_MedsWindow(){
	window.addEventListener('keydown', function(theEvent) {
		if(!!document.getElementById("lightwindow_iframe")){  	// check if lightwindow loaded
			iFrameKeyDownAction(theEvent);
		}else{													// if lightwindow not loaded
			medsPageKeyDownAction(theEvent);
		}
	
	}, true);
}

/* 
- Alt+1 clicks the 'Save and Print' button.
*/
function medsPageKeyDownAction(theEvent){
	const theKey = theEvent.key;
	const theAltKey = theEvent.altKey;
	const theCtrlKey = theEvent.ctrlKey;
	const theShiftKey= theEvent.shiftKey;
	let theTarget;
	switch(true){
		case theAltKey && theKey == 1:
			theTarget = document.evaluate("//*[@id='saveButton']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			
			// window.addEventListener('load', function(theEvent) {
			// 	console.log("window done loading");
			// });

			// setTimeout(iFrameListener, 3000);  // wait for the lightwindow to load, before attaching listeners

			break;
		case theAltKey && theKey == 'a':
			theTarget = document.getElementById("searchString");
			theTarget.focus();
			break;
		case theAltKey && theKey == 'q':
			window.close();
			break;
	}
}


///////////////////////////////////////////////////////////////////////////////////////////
// Click listener
///////////////////////////////////////////////////////////////////////////////////////////

/*
PURPOSE:
- activates the iFrame listener once Save and Print are clicked.
NOTE:
- adds click event listener to the Save and Print button. 
- Sets vertical scroll height 
- activates the lightwindow mutationObserver, which then activates the iFrame listener once loaded.
*/
function savePrintClickListener(){
	const inputButton = document.getElementById("saveButton");
	inputButton.addEventListener('click', function(theEvent){
		console.log('clicked Save and Print button');
		window.scrollTo(0, 10);
		lightwindowIFrameMutationObserver();
	});
}

///////////////////////////////////////////////////////////////////////////////////////////
// iFrame Keydown listener
///////////////////////////////////////////////////////////////////////////////////////////

/*
PURPOSE: attaches keydown event listeners to the two iframes on the prescription popup.
NOTES:
- we need these listeners because the usual window listener doesn't cover the pop-up lightwindow.
- we need two listeners for the lightwindow since there are two additional documents (and therefore 2 additional windows). 
- the second iframe is nested within the first iframe. The second iframe can't be directly referred to by the top level document, only via the first iframe.
- these listeners need to be reloaded everytime the lightwindow iframe is closed and reopened. 

BUG:
- If you Fax and Paste to EMR with an empty pharmacy, the iframe2 listener no longer works. Need to close the light window and re-open. But the top level window listener still works. The iframe1 listener works as well. This is because the iframe2 disappears when you get the fax error. So the listener disappears as well.
  - not an important bug, since the user is likely to close the light window anyway to enter in a pharmacy.
*/
function iFrameListener(){
	let iframe = document.getElementById("lightwindow_iframe");
	let iframeDoc = iframe.contentWindow.document || iframe.contentWindow;
	iframeDoc.addEventListener('keydown', function(theEvent) {
		iFrameKeyDownAction(theEvent);
	}, true);	
	
	let iframe2 = iframeDoc.getElementById("preview");
	let iframeDoc2 = iframe2.contentWindow.document || iframe2.contentWindow;
	iframeDoc2.addEventListener('keydown', function(theEvent) {
		iFrameKeyDownAction(theEvent);
	}, true);

	// console.log(iframe);
	// console.log(iframeDoc);
	// console.log(iframe2);
	// console.log(iframeDoc2);	

	console.log('iFrameListener added');
}


function iFrameKeyDownAction(theEvent){
	console.log('iframe keydown');
	const theKey = theEvent.key;
	const theAltKey = theEvent.altKey;
	const theCtrlKey = theEvent.ctrlKey;
	const theShiftKey= theEvent.shiftKey;
	let iframe = document.getElementById("lightwindow_iframe");
	let iframeDoc = iframe.contentWindow.document || iframe.contentWindow;

	let theTarget;
	switch(true){
		case theAltKey && theKey == 1:
			theTarget = iframeDoc.evaluate("//input[@value='Print & Paste into EMR']",iframeDoc,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			rxPageLoaded = false;
			break;
		case theAltKey && theKey == 2:
			theTarget = iframeDoc.evaluate("//input[@value='Fax & Paste into EMR']",iframeDoc,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			rxPageLoaded = false;
			break;	
		case theKey == 'Escape':
			theTarget = document.getElementById("lightwindow_title_bar_close_link");
			theTarget.click();
			break;
	}

}

///////////////////////////////////////////////////////////////////////////////////////////
// Mutation Observer to confirm lightwindow loaded.
///////////////////////////////////////////////////////////////////////////////////////////

/*
PURPOSE: Use MutationObserver to wait for the prescription lightwindow to be fully loaded. Once loaded, activate the prescription light window listener and disconnect the MutationObserver.

NOTES:
- had difficulty directly checking when the inner iframes were fully loaded. I tried waiting for the iframe to load, then attach a mutationObserver to that, but it didn't work (I also tried attaching eventListeners, which also didn't work). As a proxy, checked when lightwindow_loading changes its style attribute to 'display:none', as this coincides with the iframes being fully loaded.

*/
function lightwindowIFrameMutationObserver(){
	let mutationObserver = new MutationObserver(function(mutations) {

		// mutations.forEach(function(mutation) {
		// 	console.log(mutation);
		// });

		// console.log(mutations);
		if (!!document.getElementById("lightwindow_iframe")){
			let iframe = document.getElementById("lightwindow_iframe");
			let iframeDoc = iframe.contentWindow.document || iframe.contentWindow;	
			if (!!iframeDoc.getElementById("preview")){
				// let iframe2 = iframeDoc.getElementById("preview");
				// let iframeDoc2 = iframe2.contentWindow.document || iframe2.contentWindow;	
				// mutationObserver.disconnect();	
				if (document.getElementById("lightwindow_loading").getAttribute('style') == 'display: none;'){
					console.log('no more mutations');
					mutationObserver.disconnect();		
					iFrameListener();
				}
			}
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

///////////////////////////////////////////////////////////////////////////////////////////
// Confirm Close
///////////////////////////////////////////////////////////////////////////////////////////


/*
NOTE:
- triggers the confirm close dialog if there are pending prescriptions and the light window is not active.
- only fires if there is any interaction on the page.
*/
function confirmCloseMeds(){
	window.onbeforeunload = confirmExit;
}


function confirmExit() {
	//prescriptionsPendingSubmit();
	if (needConfirmClose()) {
		return "You have attempted to leave this page. If you have made any changes to the fields without clicking the Save button, your changes will be lost. Are you sure you want to exit this page?";
	}
}

/*
NOTE:
- return true if there are pending prescriptions and the light window is not active.
- No close confirmation needed if the light window is active, so that it doesn't interfere with the normal Print/Fax -> window close. Also, the light window being active means that the prescription has been saved.
*/
function needConfirmClose(){
	return prescriptionsPendingSubmit() && !isLightWindowActive();
}

/*
PURPOSE:
- return true if there are presriptions pending submission.
*/
function prescriptionsPendingSubmit(){
	let target = document.querySelectorAll("[id^='set_']");
	return target.length > 0;
}

/*
PURPOSE: return true if light window is active
NOTE:
- lightwindow_iframe element is only present when the light window is active.
*/
function isLightWindowActive(){
	return !!document.getElementById("lightwindow_iframe");
}
