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
	const isEnabled = await browser.storage.local.get('enabled');
	// console.log("Global enabled? " + isEnabled.enabled);
	if(!isEnabled.enabled){
		return;
	}
	else {
		const corticoObj = await browser.storage.local.get('cortico');
		const cortico = corticoObj.cortico;
		const cortico_keyboardShortcuts = cortico.cortico_keyboardShortcuts;
		if (cortico_keyboardShortcuts.cortico_shortcuts_enabled){
			keydownlistener_cortico(cortico_keyboardShortcuts);
		}
		
	}
}

//////////////////////////////////////////////////////////////////
// Event listener
//////////////////////////////////////////////////////////////////


/* 
NOTE:
- when trying to find the element target that closes the modal when clicked: Try the parents and children of the element that you think is being clicked.
 */
function keydownlistener_cortico(cortico_keyboardShortcuts){
	const closeModal_enabled = 
	cortico_keyboardShortcuts.cortico_shortcut_closeModal_enabled;
	const closeModal_keybinding = 
	cortico_keyboardShortcuts.cortico_shortcut_closeModal_keybinding;

	window.addEventListener('keydown', function(theEvent) {
		switch(true){
			case closeModal_enabled && keybindingMatches(closeModal_keybinding, theEvent):
				// const closeModalTarget1 = $(".tw-w-6 > path:nth-child(1)");
				// const closeModalTarget2 = $(".tw-w-6");
				const closeModalTarget3 = $(".tw-pr-3");
				// const closeModalTarget2 = $("div.tw-font-sans > div:nth-child(1) > p:nth-child(2)");

				// closeModalTarget1.click();
				// closeModalTarget2.click();
				closeModalTarget3.click();
				break;
		}
	
	}, false);
}





