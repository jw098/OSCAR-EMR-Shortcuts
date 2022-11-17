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

checkEnabled_Tickler();
async function checkEnabled_Tickler(){
	const isEnabled = await browser.storage.sync.get('enabled');
	console.log("Tickler_KeyboardShortcuts enabled? " + isEnabled.enabled);
	if(!isEnabled.enabled){
		return;
	}
	else {
		keyDownListener_Tickler();
		setFocusToTicklerTextArea();
		
	}
}

///////////////////////////////////////////////////////////////////////////////////////////
// Keydown Event Listeners
///////////////////////////////////////////////////////////////////////////////////////////


function keyDownListener_Tickler(){
	const ticklerHotkey1 = 'z';
	const ticklerHotkey2 = 'w';
	
	window.addEventListener('keydown', function(theEvent) {
		//theEvent.stopPropagation();
		//theEvent.preventDefault();
		// var theKeyCode = theEvent.charCode;// || event.which;
		// var theKey = String.fromCharCode(theKeyCode);
		const theKey = theEvent.key;
		const theAltKey = theEvent.altKey;
		const theCtrlKey = theEvent.ctrlKey;
		const theShiftKey= theEvent.shiftKey;
	
		switch(true){
			case theAltKey && (theKey == ticklerHotkey1 || theKey == ticklerHotkey2):	// hotkeys to close window.
				window.close();
				break;
			case theAltKey && theKey == 1:
				var theTarget = document.evaluate("//input[@value='Submit and EXIT']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
				theTarget.click();
				break;
			case theAltKey && theKey == 2:
				var theTarget = document.evaluate("//input[@value='Submit & Write to Encounter']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
				theTarget.click();
				break;
			case theAltKey && theKey == 'a':
				var theTarget = document.evaluate("//textarea",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
				theTarget.focus();
				break;				
		}  
				
	}, true);

}

///////////////////////////////////////////////////////////////////////////////////////////
// Set focus
///////////////////////////////////////////////////////////////////////////////////////////

function setFocusToTicklerTextArea(){
	const theTarget = document.evaluate("//textarea",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	
	setTimeout(function(){
		theTarget.focus();
	}, 200);
	
}


