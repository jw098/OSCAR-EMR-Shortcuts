
// @name        EChart_Buttons
// @namespace   Stanscripts
// @description Various navigation buttons for e-chart screen (e.g. Lab req, Ultrasound req, X-ray req).  Set your own specific fid (form number ID) or Measurement groupName. Alt+Shift+Q,W,Z opens the eForms specified.
// @include     */casemgmt/forward.jsp?action=view&demographic*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @grant       none
// ==/UserScript==


// ///////////////////////////////////////////////////////////////////////////////////////////
// // Check Enabled
// ///////////////////////////////////////////////////////////////////////////////////////////
// checkEnabled_EChart();
// async function checkEnabled_EChart(){
// 	const isEnabled = await browser.storage.local.get('enabled');
// 	console.log("Global enabled? " + isEnabled.enabled);
// 	if(!isEnabled.enabled){
// 		return;
// 	}
// 	else {
// 		keydownEventListener_eChartButtons();
// 		loadAllEchartButtons();
// 	}
// }


function loadMeasurementButtonShortcuts(measurementButtons){
	let buttonBlockID = 'measurementButtonBlock';
	removeAlreadyExistingElement_eChart(document.getElementById(buttonBlockID));
	addBlock(buttonBlockID);

	for (let i = 0; i < measurementButtons.length; i++){
		const oneMeasurementButton = measurementButtons[i];
		addOneMeasurementButton(oneMeasurementButton, (i+1), buttonBlockID);
	}
}



function loadEFormButtonShortcuts(eFormButtons){
	let buttonBlockID = 'eFormButtonBlock';
	removeAlreadyExistingElement_eChart(document.getElementById(buttonBlockID));
	addBlock(buttonBlockID);

	for (let i = 0; i < eFormButtons.length; i++){
		const oneEFormButton = eFormButtons[i];
		addOneEFormButton(oneEFormButton, (i+1), buttonBlockID);
	}
}

function addOneMeasurementButton(oneMeasurementButton, buttonNum, buttonBlockID){
	// if not enabled, stop this function
	const enabled = oneMeasurementButton[`measurementButton${buttonNum}_enabled`];
	if (!enabled){
		return;
	}
	
	const name = oneMeasurementButton[`measurementButton${buttonNum}_name`];
	const groupName = oneMeasurementButton[`measurementButton${buttonNum}_groupName`];
	const button_enabled = oneMeasurementButton[`measurementButton${buttonNum}_button_enabled`];
	const shortcuts = oneMeasurementButton[`measurementButton${buttonNum}_shortcuts`];
	const shortcuts_enabled = shortcuts[`measurementButton${buttonNum}_shortcuts_enabled`];
	const shortcuts_keybinding = shortcuts[`measurementButton${buttonNum}_shortcuts_keybinding`];

	// add listener for keyboard shortcut
	if(shortcuts_enabled){
		window.addEventListener('keydown', function(theEvent) {
			if(keybindingMatches(shortcuts_keybinding, theEvent)){
				// clickAction();
				openMeasurementLink(groupName);
			}
		});
	}

	if (button_enabled){
		addButtonMeasurement(`measurementButton${buttonNum}`, name, groupName, buttonBlockID);
	}
}


function addOneEFormButton(oneEFormButton, buttonNum, buttonBlockID){
	// if not enabled, stop this function
	const enabled = oneEFormButton[`eFormButton${buttonNum}_enabled`];
	if (!enabled){
		return;
	}
	const name = oneEFormButton[`eFormButton${buttonNum}_name`];
	const fid = oneEFormButton[`eFormButton${buttonNum}_fid`];
	const button_enabled = oneEFormButton[`eFormButton${buttonNum}_button_enabled`];
	const shortcuts = oneEFormButton[`eFormButton${buttonNum}_shortcuts`];
	const shortcuts_enabled = shortcuts[`eFormButton${buttonNum}_shortcuts_enabled`];
	const shortcuts_keybinding = shortcuts[`eFormButton${buttonNum}_shortcuts_keybinding`];

	// add listener for keyboard shortcut
	if(shortcuts_enabled){
		window.addEventListener('keydown', function(theEvent) {
			if(keybindingMatches(shortcuts_keybinding, theEvent)){
				// clickAction();
				openEFormLink(fid);
			}
		});
	}

	if (button_enabled){
		addButtonEForm(`eFormButton${buttonNum}`, name, fid, buttonBlockID);
	}
}

// const labReqFID = 510;
// const xrayReqFID = 359;
// const usReqFID = 293;

// ///////////////////////////////////////////////////////////////
// // Event listeners
// ///////////////////////////////////////////////////////////////

// function keydownEventListener_openEForm(eChartButtons){
// 	const eChartButtonVitals = eChartButtons.eChartButtonVitals;
// 	const eChartButtonVitals_enabled = eChartButtonVitals.eChartButtonVitals_enabled;
// 	const eChartButtonVitals_shortcuts = eChartButtonVitals.eChartButtonVitals_shortcuts;
// 	const eChartButtonVitals_shortcuts_enabled = 
// 		eChartButtonVitals_shortcuts.eChartButtonVitals_shortcuts_enabled;
// 	const eChartButtonVitals_shortcuts_keybinding = 
// 		eChartButtonVitals_shortcuts.eChartButtonVitals_shortcuts_keybinding;

// 	const eChartButton1 = eChartButtons.eChartButton1;
// 	const eChartButton1_fid = eChartButton1.eChartButton1_fid;
// 	const eChartButton1_enabled = eChartButton1.eChartButton1_enabled;
// 	const eChartButton1_shortcuts = eChartButton1.eChartButton1_shortcuts;
// 	const eChartButton1_shortcuts_enabled = 
// 		eChartButton1_shortcuts.eChartButton1_shortcuts_enabled;
// 	const eChartButton1_shortcuts_keybinding = 
// 		eChartButton1_shortcuts.eChartButton1_shortcuts_keybinding;

// 	const eChartButton2 = eChartButtons.eChartButton2;
// 	const eChartButton2_fid = eChartButton2.eChartButton2_fid;
// 	const eChartButton2_enabled = eChartButton2.eChartButton2_enabled;
// 	const eChartButton2_shortcuts = eChartButton2.eChartButton2_shortcuts;
// 	const eChartButton2_shortcuts_enabled = 
// 		eChartButton2_shortcuts.eChartButton2_shortcuts_enabled;
// 	const eChartButton2_shortcuts_keybinding = 
// 		eChartButton2_shortcuts.eChartButton2_shortcuts_keybinding;		

// 	const eChartButton3 = eChartButtons.eChartButton3;
// 	const eChartButton3_fid = eChartButton3.eChartButton3_fid;
// 	const eChartButton3_enabled = eChartButton3.eChartButton3_enabled;
// 	const eChartButton3_shortcuts = eChartButton3.eChartButton3_shortcuts;
// 	const eChartButton3_shortcuts_enabled = 
// 		eChartButton3_shortcuts.eChartButton3_shortcuts_enabled;
// 	const eChartButton3_shortcuts_keybinding = 
// 		eChartButton3_shortcuts.eChartButton3_shortcuts_keybinding;	

// 	const eChartButton4 = eChartButtons.eChartButton4;
// 	const eChartButton4_fid = eChartButton4.eChartButton4_fid;
// 	const eChartButton4_enabled = eChartButton4.eChartButton4_enabled;
// 	const eChartButton4_shortcuts = eChartButton4.eChartButton4_shortcuts;
// 	const eChartButton4_shortcuts_enabled = 
// 		eChartButton4_shortcuts.eChartButton4_shortcuts_enabled;
// 	const eChartButton4_shortcuts_keybinding = 
// 		eChartButton4_shortcuts.eChartButton4_shortcuts_keybinding;	

// 	const eChartButton5 = eChartButtons.eChartButton5;
// 	const eChartButton5_fid = eChartButton5.eChartButton5_fid;
// 	const eChartButton5_enabled = eChartButton5.eChartButton5_enabled;
// 	const eChartButton5_shortcuts = eChartButton5.eChartButton5_shortcuts;
// 	const eChartButton5_shortcuts_enabled = 
// 		eChartButton5_shortcuts.eChartButton5_shortcuts_enabled;
// 	const eChartButton5_shortcuts_keybinding = 
// 		eChartButton5_shortcuts.eChartButton5_shortcuts_keybinding;	

// 	const eChartButton6 = eChartButtons.eChartButton6;
// 	const eChartButton6_fid = eChartButton6.eChartButton6_fid;
// 	const eChartButton6_enabled = eChartButton6.eChartButton6_enabled;
// 	const eChartButton6_shortcuts = eChartButton6.eChartButton6_shortcuts;
// 	const eChartButton6_shortcuts_enabled = 
// 		eChartButton6_shortcuts.eChartButton6_shortcuts_enabled;
// 	const eChartButton6_shortcuts_keybinding = 
// 		eChartButton6_shortcuts.eChartButton6_shortcuts_keybinding;	

// 	window.addEventListener("keydown", function(theEvent){
// 		switch(true){
// 			case eChartButtonVitals_enabled && 
// 				eChartButtonVitals_shortcuts_enabled && 
// 				keybindingMatches(eChartButtonVitals_shortcuts_keybinding, theEvent):
				
// 				openVitalsLink();
// 				break;
// 			case eChartButton1_enabled && 
// 				eChartButton1_shortcuts_enabled && 
// 				keybindingMatches(eChartButton1_shortcuts_keybinding, theEvent):
				
// 				openEFormLink(eChartButton1_fid);
// 				break;
// 			case eChartButton2_enabled && 
// 				eChartButton2_shortcuts_enabled && 
// 				keybindingMatches(eChartButton2_shortcuts_keybinding, theEvent):
				
// 				openEFormLink(eChartButton2_fid);
// 				break;
// 			case eChartButton3_enabled && 
// 				eChartButton3_shortcuts_enabled && 
// 				keybindingMatches(eChartButton3_shortcuts_keybinding, theEvent):
				
// 				openEFormLink(eChartButton3_fid);
// 				break;
// 			case eChartButton4_enabled && 
// 				eChartButton4_shortcuts_enabled && 
// 				keybindingMatches(eChartButton4_shortcuts_keybinding, theEvent):
				
// 				openEFormLink(eChartButton4_fid);
// 				break;
// 			case eChartButton5_enabled && 
// 				eChartButton5_shortcuts_enabled && 
// 				keybindingMatches(eChartButton5_shortcuts_keybinding, theEvent):
				
// 				openEFormLink(eChartButton5_fid);
// 				break;			
// 			case eChartButton6_enabled && 
// 				eChartButton6_shortcuts_enabled && 
// 				keybindingMatches(eChartButton6_shortcuts_keybinding, theEvent):
				
// 				openEFormLink(eChartButton6_fid);
// 				break;	
// 		}
// 	}, false);
// }


///////////////////////////////////////////////////////////////
// Load Buttons
///////////////////////////////////////////////////////////////


// function loadAllEFormButtons(eChartButtons){
// 	const eChartButtonVitals = eChartButtons.eChartButtonVitals;
// 	const eChartButton1 = eChartButtons.eChartButton1;
// 	const eChartButton2 = eChartButtons.eChartButton2;
// 	const eChartButton3 = eChartButtons.eChartButton3;
// 	const eChartButton4 = eChartButtons.eChartButton4;
// 	const eChartButton5 = eChartButtons.eChartButton5;
// 	const eChartButton6 = eChartButtons.eChartButton6;

// 	let buttonBlockID = 'buttonBlock1';
// 	removeAlreadyExistingElement_eChart(document.getElementById(buttonBlockID));
// 	addBlock(buttonBlockID);

// 	if(eChartButtonVitals.eChartButtonVitals_enabled){
// 		// addButtonEForm('buttonOpenVitals', 'Vitals', labReqFID, buttonBlockID);
// 		addButtonVitals(buttonBlockID);
// 	}

// 	if(eChartButton1.eChartButton1_enabled && eChartButton1.eChartButton1_button_enabled){
// 		addButtonEForm(
// 			'customButton1', 
// 			eChartButton1.eChartButton1_name, 
// 			eChartButton1.eChartButton1_fid, 
// 			buttonBlockID);

// 	}

// 	if(eChartButton2.eChartButton2_enabled && eChartButton2.eChartButton2_button_enabled){
// 		addButtonEForm(
// 			'customButton2', 
// 			eChartButton2.eChartButton2_name, 
// 			eChartButton2.eChartButton2_fid, 
// 			buttonBlockID);

// 	}

// 	if(eChartButton3.eChartButton3_enabled && eChartButton3.eChartButton3_button_enabled){
// 		addButtonEForm(
// 			'customButton3', 
// 			eChartButton3.eChartButton3_name, 
// 			eChartButton3.eChartButton3_fid, 
// 			buttonBlockID);

// 	}

// 	if(eChartButton4.eChartButton4_enabled && eChartButton4.eChartButton4_button_enabled){
// 		addButtonEForm(
// 			'customButton4', 
// 			eChartButton4.eChartButton4_name, 
// 			eChartButton4.eChartButton4_fid, 
// 			buttonBlockID);

// 	}

// 	if(eChartButton5.eChartButton5_enabled && eChartButton5.eChartButton5_button_enabled){
// 		addButtonEForm(
// 			'customButton5', 
// 			eChartButton5.eChartButton5_name, 
// 			eChartButton5.eChartButton5_fid, 
// 			buttonBlockID);

// 	}

// 	if(eChartButton6.eChartButton6_enabled && eChartButton6.eChartButton6_button_enabled){
// 		addButtonEForm(
// 			'customButton6', 
// 			eChartButton6.eChartButton6_name,
// 			eChartButton6.eChartButton6_fid, 
// 			buttonBlockID);

// 	}
// }

/* 
PURPOSE
- if the given element already exists in the document, remove it.
 */
function removeAlreadyExistingElement_eChart(element){
	if(!!element){
		element.remove();
	}
}


function addBlock(id){
	var targetDiv = document.getElementById('rightNavBar');
	var theBlock = document.createElement('div');
	theBlock.id = id;
	theBlock.class = 'rightBox';
	theBlock.style = 'display: block;';
	targetDiv.appendChild(theBlock);
}
 
 // wrap in block level element so button is next line.
function addButtonEForm(id, value, fid, divBlock){
	let targetDiv = document.getElementById(divBlock);
	if (targetDiv == null){
		targetDiv = document.getElementById('rightNavBar');
	}
	var inputButton = document.createElement('input');
	inputButton.id = id;
	inputButton.type = 'button';
	inputButton.value = value;
	targetDiv.appendChild(inputButton);	
	openEFormButton_ClickListener(id, fid);
}

function openEFormButton_ClickListener(id, fid){
	var theButton = document.getElementById(id);
	theButton.addEventListener('click',function () { openEFormLink(fid); },true);
}

 // wrap in block level element so button is next line.
function addButtonMeasurement(id, name, groupName, divBlock){
	let targetDiv = document.getElementById(divBlock);
	if (targetDiv == null){
		targetDiv = document.getElementById('rightNavBar');
	}
	var inputButton = document.createElement('input');
	inputButton.id = id;
	inputButton.type = 'button';
	inputButton.value = name;
	targetDiv.appendChild(inputButton);	
	openMeasurementButton_ClickListener(id, groupName);
}

function openMeasurementButton_ClickListener(id, groupName){
	var theButton = document.getElementById(id);
	theButton.addEventListener('click',function () { openMeasurementLink(groupName); },true);
}
 
function openMeasurementLink(groupName){
	var elements = (window.location.pathname.split('/', 2));
	const firstElement = (elements.slice(1));
	const vPath = ("https://" + location.host + "/"  + firstElement + "/");
  	
	var measurementPath = 
		vPath + "oscarEncounter/oscarMeasurements/SetupMeasurements.do?groupName=" + groupName;
	window.open(measurementPath);
}
   

//  // wrap in block level element so button is next line.
// function addButtonVitals(divBlock){
// 	let targetDiv = document.getElementById(divBlock);
// 	if (targetDiv == null){
// 		targetDiv = document.getElementById('rightNavBar');
// 	}
// 	var inputButton = document.createElement('input');
// 	inputButton.id = "vitalsButtons";
// 	inputButton.type = 'button';
// 	inputButton.value = "Vitals";
// 	targetDiv.appendChild(inputButton);	
// 	openVitalsButton_KeyDownListener();
// }

// function openVitalsButton_KeyDownListener(){
// 	var theButton = document.getElementById("vitalsButtons");
// 	theButton.addEventListener('click',function () { openVitalsLink(); },true);
// }
 
// function openVitalsLink(){
// 	var elements = (window.location.pathname.split('/', 2));
// 	const firstElement = (elements.slice(1));
// 	const vPath = ("https://" + location.host + "/"  + firstElement + "/");
  	
// 	var vitalsPath = vPath + "oscarEncounter/oscarMeasurements/SetupMeasurements.do?groupName=Vitals";
// 	window.open(vitalsPath)
// }


function openEFormLink(fid){
	// if given FID is not an integer, open the emptyFID.html page.
	// console.log(fid);
	// console.log(Number(fid));
	// console.log(Number.isInteger(Number(fid)));
	if(fid == "" || !Number.isInteger(Number(fid))){
		window.open(browser.runtime.getURL("emptyFID.html"));
		return;
	}
	var elements = (window.location.pathname.split('/', 2));
	const firstElement = (elements.slice(1));
	const vPath = ("https://" + location.host + "/"  + firstElement + "/");
  	
	var formPath = vPath + "eform/efmformadd_data.jsp?fid=" + fid + "&demographic_no=" + findDemogNum();
	window.open(formPath)
}

function findDemogNum(){
	var myParam = location.search.split('demographicNo=')[1];
	//alert(myParam)
	var res = myParam.indexOf("&");
	var demo_no = myParam.substring(0,res);
	return demo_no;
}
