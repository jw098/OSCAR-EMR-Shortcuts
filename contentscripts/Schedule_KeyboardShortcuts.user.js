// ==UserScript==
// @name           Schedule_KeyboardShortcuts
// @namespace      oscar
// @include        */provider/providercontrol.jsp?* 
// @include        *provider/appointmentprovideradminday.jsp* 
// @description		Within the Schedule page: Alt+1 opens the e-chart for the next patient. i.e. the first patient that is not Billed, not Signed, not No show, and not Cancelled. Alt+Z open the Inbox.
// @grant       none
// ==/UserScript==

///////////////////////////////////////////////////////////////////////////////////////////
// Check Enabled
///////////////////////////////////////////////////////////////////////////////////////////

checkEnabled_Schedule();
async function checkEnabled_Schedule(){
	const isEnabled = await browser.storage.sync.get('enabled');
	console.log(await browser.storage.sync.get(null));
	
	console.log("Schedule_KeyboardShortcuts enabled? " + isEnabled.enabled);
	if(!isEnabled.enabled){
		return;
	}
	else {
		const schedule = await browser.storage.sync.get('schedule');
		const schedule_keyboardShortcuts = schedule.schedule.schedule_keyboardShortcuts;
		if (schedule_keyboardShortcuts.schedule_shortcuts_enabled){
			scheduleKeyDownListener(schedule_keyboardShortcuts);
		}

		
	}
}
///////////////////////////////////////////////////////////////////////////////////////////
// Event Listeners
///////////////////////////////////////////////////////////////////////////////////////////

// const myMap = new Map();
// window.addEventListener("keydown", function(e){
// 	// keys[e.key] = e.key;
// 	// keys.push(e.key);
// 	myMap.set(e.key, e.key);
// 	// console.log(myMap);
// 	console.log(e);
// });

// window.addEventListener("keyup", function(e){
// 	// keys[e.key] = e.key;
// 	// keys.push(e.key);
// 	// console.log(myMap);
// 	// console.log(e.key);
// 	myMap.delete(e.key);
// 	// console.log(myMap);
// });

// function compareMaps(map1, map2) {
//     var testVal;
//     if (map1.size !== map2.size) {
//         return false;
//     }
//     for (var [key, val] of map1) {
//         testVal = map2.get(key);
//         // in cases of an undefined value, make sure the key
//         // actually exists on the object so there are no false positives
//         if (testVal !== val || (testVal === undefined && !map2.has(key))) {
//             return false;
//         }
//     }
//     return true;
// }




function scheduleKeyDownListener(schedule_keyboardShortcuts){
	/*           schedule_shortcut_openEChart_enabled: schedule_shortcut_openEChart_enabled,
          schedule_shortcut_openEChart_keybinding: schedule_shortcut_openEChart_keybinding */
	console.log(schedule_keyboardShortcuts);
	const openEChart_enabled = 
		schedule_keyboardShortcuts.schedule_shortcut_openEChart_enabled;
	const openEChart_keybinding = 
		schedule_keyboardShortcuts.schedule_shortcut_openEChart_keybinding;
	const openInbox_enabled = schedule_keyboardShortcuts.schedule_shortcut_openInbox_enabled;
	const openInbox_keybinding = schedule_keyboardShortcuts.schedule_shortcut_openInbox_keybinding;

	// filter out title: "No Show", "signed"
	window.addEventListener('keydown', function(theEvent) {
		const theKey = theEvent.key;    
		const theAltKey = theEvent.altKey;
		const theCtrlKey = theEvent.ctrlKey;
		const theShiftKey= theEvent.shiftKey;
		let theTarget;
		switch(true){
			case openEChart_enabled && keybindingMatches(openEChart_keybinding, theEvent):
				/* 
				- Gets the first td element where the icon image doesn't contain "cancel" or "noshow" or "signed. 
				- Billed items are filtered out as well because the billing image is not located in the structure td/a/img, but rather td/img. The td element must also contain the Encounter node (e.g. not appointments such as LUNCH or DO_NOT_BOOK). The Encounter node is then selected.
				- Note: Breaking the expression into two (e.g. get the td element first, then selecting the encounter element) doesn't work, as you need to specify that the td element contains the encounter element. Else, you select for appointments without enounters such as LUNCH or DO_NO_BOOK. 
				*/
				const xpath = 'id("providerSchedule")/tbody//td[a[img[not(contains(string(@src),"cancel")) and not(contains(string(@src),"noshow")) and not(contains(string(@title),"Signed"))]]]/a[@title="Encounter"]';
				theTarget = document.evaluate(xpath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE ,null).singleNodeValue;            
				theTarget.click();
				break;
			case openInbox_enabled && keybindingMatches(openInbox_keybinding, theEvent):
				theTarget = document.getElementById("oscar_new_lab");
				theTarget.click();
				break;
		}
	}, true);
}


// function findFirstPendingAppt(allAppts){
		// // console.log(allAppts);
	// // let keylabresultlist = "";	
	// // let index = 0;
	// // console.log(allAppts);
	// allAppts.forEach(	
		// function(e){	
			// // console.log('hi2');
			// // 
			// // console.log(e.childNodes[4]);
			// console.log(e.children[2].children[0]);
			
		// }
	// )
	
	// return keylabresultlist;
// }