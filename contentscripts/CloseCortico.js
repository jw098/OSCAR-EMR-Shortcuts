// ==UserScript==
// @name           CloseCortico
// @namespace      oscar
// @include        *oscar*
// @description		On any OSCAR page, press Escape to close the popup from the Cortico extension.
// @grant	   none
// ==/UserScript==


///////////////////////////////////////////////////////////////////////////////////////////
// Check Enabled
///////////////////////////////////////////////////////////////////////////////////////////
checkEnabled_CloseCortico();
async function checkEnabled_CloseCortico(){
	const isEnabled = await browser.storage.sync.get('enabled');
	// console.log("Global enabled? " + isEnabled.enabled);
	if(!isEnabled.enabled){
		return;
	}
	else {
		closeCortico();
	}
}

//////////////////////////////////////////////////////////////////
// Event listener
//////////////////////////////////////////////////////////////////

var theTarget2 = document.querySelectorAll(".tw-w-6")[0];
theTarget2.addEventListener('click', function(theEvent) {
	console.log("clicked t2");
}, true);

var theTarget3 = document.querySelectorAll(".tw-ml-1")[0];
theTarget3.addEventListener('click', function(theEvent) {
	console.log("clicked t3");
}, true);

function closeCortico(){
	window.addEventListener('keydown', function(theEvent) {
		//theEvent.stopPropagation();
		//theEvent.preventDefault();
		// var theKeyCode = theEvent.charCode;// || event.which;
		// var theKey = String.fromCharCode(theKeyCode);
		const theKey = theEvent.key;
		const theAltKey = theEvent.altKey;
		const theCtrlKey = theEvent.ctrlKey;
		const theShiftKey= theEvent.shiftKey;
		let currentURL = window.location.href;
		
		switch(true){
			case theKey == 'Escape':  // Sign, Save, and Bill 
				var theTarget = document.querySelectorAll("div.tw-font-sans:nth-child(3) > div:nth-child(1) > p:nth-child(2)")[0];
				theTarget.click();
				console.log(theTarget);
				break;
		}
	
	}, false);
}




