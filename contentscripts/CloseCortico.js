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
		const corticoObj = await browser.storage.sync.get('cortico');
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

var theTarget2 = document.querySelectorAll(".tw-w-6")[0];
theTarget2.addEventListener('click', function(theEvent) {
	console.log("clicked t2");
}, true);

var theTarget3 = document.querySelectorAll(".tw-ml-1")[0];
theTarget3.addEventListener('click', function(theEvent) {
	console.log("clicked t3");
}, true);

function keydownlistener_cortico(cortico_keyboardShortcuts){
	const closeModal_enabled = 
	cortico_keyboardShortcuts.cortico_shortcut_closeModal_enabled;
	const closeModal_keybinding = 
	cortico_keyboardShortcuts.cortico_shortcut_closeModal_keybinding;

	window.addEventListener('keydown', function(theEvent) {
		switch(true){
			case closeModal_enabled && keybindingMatches(closeModal_keybinding, theEvent):
				// const target1 = $("div.tw-font-sans:nth-child(3) > div:nth-child(1) > p:nth-child(2)");
				// const target2 = $("div.tw-font-sans:nth-child(4) > div:nth-child(1) > p:nth-child(2)");
				const target3 = $("div.tw-font-sans > div:nth-child(1) > p:nth-child(2):has(svg)");
				
				// target1.click();
				// target2.click();
				target3.click();
				// console.log(target1);
				// console.log(target2);
				console.log(target3);
				break;
		}
	
	}, false);
}




