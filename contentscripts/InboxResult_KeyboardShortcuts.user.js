// ==UserScript==
// @name           Inbox_KeyboardShortcuts
// @namespace      oscar
// @include        */lab/CA/ALL/labDisplay*
// @include        */dms/showDocument*
// @include        */dms/MultiPageDocDisplay.jsp*
// @description		Within Inbox: Alt+1 to open first item. Within the Lab result: Alt+1 to Acknowledge. Alt+Q to open E-chart. Alt+W to open Tickler. 
// @grant	   none
// ==/UserScript==



///////////////////////////////////////////////////////////////////////////////////////////
// Keydown Event Listener
///////////////////////////////////////////////////////////////////////////////////////////

function keydownEventListener_InboxResult(){
	window.addEventListener('keydown', function(theEvent) {
		//theEvent.stopPropagation();
		//theEvent.preventDefault();
		// var theKeyCode = theEvent.charCode;// || event.which;
		// var theKey = String.fromCharCode(theKeyCode);
		var theKey = theEvent.key;
		var theAltKey = theEvent.altKey;
		var theCtrlKey = theEvent.ctrlKey;
		var theShiftKey= theEvent.shiftKey;
	  
		let currentURL = window.location.href;
		const labResultPage = /lab\/CA\/ALL\/labDisplay/
		const ticklerPage = /tickler\/ForwardDemographicTickler/
		const documentPage = /dms\/showDocument/

		switch(true){
			case (theAltKey && theKey == 1):			// Alt+1: Acknowledge the result.
				var theTarget = document.evaluate("//input[@value='Acknowledge']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
				theTarget.click();					
				break;		
			case (theAltKey && theKey == 'q'):  							// Alt+Q: open E-chart
				var theTarget = document.evaluate("//input[contains(@value, 'E-Chart') or contains(@value, 'eChart')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
				theTarget.click();
				break;
			case (theAltKey && theKey == 'w'):  							// Alt+W: open Tickler
				var theTarget = document.evaluate("//input[@value='Tickler']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
				theTarget.click();
				break;
		}

	
	}, true);
}

